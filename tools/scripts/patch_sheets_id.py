import json
import glob

spreadsheet_id = "1cbnDSwdxZlJe0s8J4FQSU_ccPZIIts-GhjxXrOEdYzg"

files = glob.glob('tools/scripts/n8n_workflows/*.json')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    changed = False
    for node in data.get('nodes', []):
        if node['type'] == 'n8n-nodes-base.googleSheets':
            if 'parameters' in node and 'documentId' in node['parameters']:
                node['parameters']['documentId']['value'] = spreadsheet_id
                changed = True

    if changed:
        with open(f, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4)
        print(f"Patched {f}")
