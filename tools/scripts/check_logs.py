import urllib.request, json, ssl, os
from deploy_akibot import headers

url = 'https://n8n.akiwaky.cloud/api/v1/executions?limit=30&includeData=true'
req = urllib.request.Request(url, headers=headers())

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())
    out = ''
    for e in data.get('data', []):
        wfdata = e.get('workflowData', {})
        wfname = wfdata.get('name', '')
        if 'Log Event' in wfname or 'Save' in wfname:
            out += f"{wfname} [{e['id']}]: {e['status']}\n"
    print(out)
