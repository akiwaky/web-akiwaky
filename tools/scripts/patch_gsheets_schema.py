import os
import glob
import json

workflows_dir = r"c:\Antigravity\Repo-Web\tools\scripts\n8n_workflows"

for file_path in glob.glob(os.path.join(workflows_dir, "AkiBot-*.json")):
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    modified = False
    for node in data.get("nodes", []):
        if node.get("type") == "n8n-nodes-base.googleSheets":
            params = node.get("parameters", {})
            columns = params.get("columns", {})
            mapping_mode = columns.get("mappingMode")
            
            # For append and update operations using defineBelow
            if mapping_mode == "defineBelow" and "value" in columns:
                schema = []
                for key in columns["value"].keys():
                    schema.append({
                        "id": key,
                        "displayName": key,
                        "required": False,
                        "defaultMatch": False,
                        "display": True,
                        "type": "string",
                        "canBeUsedToMatch": True,
                        "removed": False
                    })
                columns["schema"] = schema
                modified = True

    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)
        print(f"Patched {os.path.basename(file_path)}")
