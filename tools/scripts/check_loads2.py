import urllib.request, json, ssl, os
from deploy_akibot import headers

url = 'https://n8n.akiwaky.cloud/api/v1/executions?limit=15&includeData=true'
req = urllib.request.Request(url, headers=headers())

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())
    out = ''
    for e in data.get('data', []):
        wfdata = e.get('workflowData', {})
        wfname = wfdata.get('name', '')
        if 'Load Session' in wfname or 'Test Harness' in wfname or 'Main Inbound Core' in wfname or 'Human Handoff' in wfname or 'Generate Reply' in wfname or 'Classify Intent' in wfname:
            out += f"{wfname} [{e['id']}]: {e['status']}\n"
    with open('loads.txt', 'w', encoding='utf-8') as f:
        f.write(out)
