import urllib.request, json, ssl, os
from deploy_akibot import headers

url = 'https://n8n.akiwaky.cloud/api/v1/executions?limit=30&includeData=true'
req = urllib.request.Request(url, headers=headers())

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())
    found = False
    for e in data.get('data', []):
        wfdata = e.get('workflowData', {})
        wfname = wfdata.get('name', '')
        if 'Main Inbound Core' in wfname and e.get('status') == 'error':
            with open('../last_core_error.json', 'w', encoding='utf-8') as f:
                json.dump(e, f, indent=2)
            print(f"Saved exec {e['id']} for {wfname}")
            found = True
            break
    if not found:
        print("No errored Main Inbound Core execution found.")
