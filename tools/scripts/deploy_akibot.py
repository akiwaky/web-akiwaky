"""
AkiBot Sprint 1 -- Deploy all workflows to n8n instance.
Imports leaf sub-workflows first, then wires their IDs into orchestrators.
"""
import urllib.request
import json
import sys
import os
import ssl
import time
import traceback

with open("debug_deploy.log", "w", encoding="utf-8") as _log:
    pass

def log_debug(msg):
    with open("debug_deploy.log", "a", encoding="utf-8") as f:
        f.write(str(msg) + "\n")

API_KEY = os.environ.get("N8N_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYzc4MDVjYi04Y2JmLTQzNjUtYTViYi0xZGMzYTE1OWUyNDkiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMzRkNzYxOTEtODM2ZS00ZjczLTkwMTctOTE2MGZjMDUxNGMwIiwiaWF0IjoxNzczMDAzNTY2fQ.dctlc9JAfv7grwSxvzvIJpivVuGwDbsnEKHHtQG00f4")
BASE_URL = "https://n8n.akiwaky.cloud"
CF_CLIENT_ID = os.environ.get("CF_ACCESS_CLIENT_ID", "d05d9aff866cd191e550f62c4923e3d8")
CF_CLIENT_SECRET = os.environ.get("CF_ACCESS_CLIENT_SECRET", "7fec66c70907c9fdd7ca1034fbc361f45d116b8c9e860923dca6e8757cf17b65")

WORKFLOWS_DIR = os.path.join(os.path.dirname(__file__), "n8n_workflows")

DEPLOY_ORDER = [
    "AkiBot-Log-Event.json",
    "AkiBot-Human-Handoff.json",
    "AkiBot-Save-Session.json",
    "AkiBot-Load-Session.json",
    "AkiBot-Classify-Intent.json",
    "AkiBot-Query-KB.json",
    "AkiBot-Generate-Reply.json",
    "AkiBot-Error-Handler.json",
    "AkiBot-Main-Inbound-Core.json",
    "AkiBot-WhatsApp-Inbound.json",
    "AkiBot-Test-Harness.json",
]

WORKFLOW_ID_MAP = {
    "AkiBot - Load Session": "LOAD_SESSION_ID",
    "AkiBot - Classify Intent": "CLASSIFY_INTENT_ID",
    "AkiBot - Query KB": "QUERY_KB_ID",
    "AkiBot - Generate Reply": "GENERATE_REPLY_ID",
    "AkiBot - Save Session": "SAVE_SESSION_ID",
    "AkiBot - Log Event": "LOG_EVENT_ID",
    "AkiBot - Human Handoff": "HUMAN_HANDOFF_ID",
    "AkiBot - Main Inbound Core": "MAIN_CORE_ID",
}

def headers():
    return {
        "X-N8N-API-KEY": API_KEY,
        "CF-Access-Client-Id": CF_CLIENT_ID,
        "CF-Access-Client-Secret": CF_CLIENT_SECRET,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

def api_request(method, path, data=None):
    url = f"{BASE_URL}/api/v1{path}"
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers(), method=method)
    ctx = ssl.create_default_context()
    try:
        with urllib.request.urlopen(req, context=ctx) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        err_body = e.read().decode() if e.fp else ""
        log_debug(f"  ERROR {e.code}: {err_body[:800]}")
        return None
    except Exception as e:
        log_debug(f"  ERROR: {str(e)[:500]}")
        return None

def find_existing_workflow(name):
    result = api_request("GET", f"/workflows?limit=200")
    if result and result.get("data"):
        for wf in result["data"]:
            if wf["name"] == name:
                return wf["id"]
    return None

def deploy_workflow(filename, id_replacements):
    filepath = os.path.join(WORKFLOWS_DIR, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    for name, real_id in id_replacements.items():
        placeholder = WORKFLOW_ID_MAP.get(name, "")
        if placeholder:
            content = content.replace(f'"={{{{ /*{placeholder}*/ }}}}"', f'"{real_id}"')

    wf_data = json.loads(content)
    wf_name = wf_data["name"]

    if "settings" in wf_data and "callerPolicy" in wf_data["settings"]:
        del wf_data["settings"]["callerPolicy"]
        
    for read_only_field in ["active", "id", "createdAt", "updatedAt"]:
        if read_only_field in wf_data:
            del wf_data[read_only_field]

    existing_id = find_existing_workflow(wf_name)

    if existing_id:
        log_debug(f"  Updating existing workflow: {wf_name} (ID: {existing_id})")
        result = api_request("PUT", f"/workflows/{existing_id}", wf_data)
        if result:
            wf_id = result.get("id", existing_id)
            log_debug(f"  [OK] Updated: {wf_name} -> {wf_id}")
            return wf_id
    else:
        log_debug(f"  Creating new workflow: {wf_name}")
        result = api_request("POST", "/workflows", wf_data)
        if result:
            wf_id = result.get("id", "")
            log_debug(f"  [OK] Created: {wf_name} -> {wf_id}")
            return wf_id

    log_debug(f"  [FAIL] {wf_name}")
    return None

def activate_workflow(wf_id):
    result = api_request("POST", f"/workflows/{wf_id}/activate")
    if result:
        log_debug(f"  [OK] Activated: {wf_id}")
    else:
        log_debug(f"  [FAIL] Activate: {wf_id}")

def main():
    try:
        log_debug("=" * 60)
        log_debug("AkiBot Sprint 1 -- Deploying workflows to n8n")
        log_debug("=" * 60)

        deployed = {}

        for filename in DEPLOY_ORDER:
            log_debug(f"\n--- {filename} ---")
            wf_id = deploy_workflow(filename, deployed)
            if wf_id:
                filepath = os.path.join(WORKFLOWS_DIR, filename)
                with open(filepath, "r", encoding="utf-8") as f:
                    wf_name = json.load(f)["name"]
                deployed[wf_name] = wf_id
                time.sleep(0.5)
            else:
                log_debug(f"  SKIPPING: {filename} failed")

        log_debug("\n" + "=" * 60)
        log_debug("Deployment Summary")
        log_debug("=" * 60)
        for name, wf_id in deployed.items():
            log_debug(f"  {name}: {wf_id}")

        orchestrators_to_update = [
            "AkiBot-Main-Inbound-Core.json",
            "AkiBot-WhatsApp-Inbound.json",
            "AkiBot-Test-Harness.json",
        ]

        if len(deployed) >= 8:
            log_debug("\n--- Wiring sub-workflow IDs into orchestrators ---")
            for filename in orchestrators_to_update:
                filepath = os.path.join(WORKFLOWS_DIR, filename)
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()

                for wf_name, wf_id in deployed.items():
                    placeholder = WORKFLOW_ID_MAP.get(wf_name)
                    if placeholder:
                        content = content.replace(f"={{{{ /*{placeholder}*/ }}}}", wf_id)

                wf_data = json.loads(content)
                wf_name_actual = wf_data["name"]
                existing_id = deployed.get(wf_name_actual)

                if existing_id:
                    log_debug(f"\n  Re-deploying {wf_name_actual} with real IDs...")
                    result = api_request("PUT", f"/workflows/{existing_id}", wf_data)
                    if result:
                        log_debug(f"  [OK] Wired: {wf_name_actual}")
                    else:
                        log_debug(f"  [FAIL] Failed to wire: {wf_name_actual}")

        log_debug("\n--- Activating workflows ---")
        for name, wf_id in deployed.items():
            if name in ["AkiBot - Error Handler"]:
                log_debug(f"  Skipping activation: {name} (manual only)")
                continue
            activate_workflow(wf_id)

        log_debug("\n" + "=" * 60)
        log_debug("DONE. Final workflow IDs:")
        log_debug(json.dumps(deployed, indent=2))
        
    except Exception as e:
        log_debug("FATAL CRASH:")
        log_debug(traceback.format_exc())

if __name__ == "__main__":
    main()
