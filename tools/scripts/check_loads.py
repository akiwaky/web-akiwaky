import urllib.request, json, ssl, os
from deploy_akibot import headers

url = 'https://n8n.akiwaky.cloud/api/v1/executions?limit=50&includeData=true'
req = urllib.request.Request(url, headers=headers())

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())
    for e in data.get('data', []):
        wfdata = e.get('workflowData', {})
        wfname = wfdata.get('name', '')
        if 'Load Session' in wfname or 'Test Harness' in wfname or 'Main Inbound Core' in wfname:
            print(f"Execution {e['id']} for {wfname}: status={e['status']}")
