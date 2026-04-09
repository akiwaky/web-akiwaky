import urllib.request, json, ssl, os
from deploy_akibot import headers

url = 'https://n8n.akiwaky.cloud/api/v1/executions?limit=30&includeData=true'
req = urllib.request.Request(url, headers=headers())

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        found = False
        for e in data.get('data', []):
            wfdata = e.get('workflowData', {})
            wfname = wfdata.get('name', '')
            if 'Test Harness' in wfname:
                with open('../last_harness.json', 'w', encoding='utf-8') as f:
                    json.dump(e, f, indent=2)
                print(f"Saved exec {e['id']} for {wfname}")
                found = True
                break
        if not found:
            print('Test harness execution not found.')
except Exception as e:
    print('ERROR:', e)
