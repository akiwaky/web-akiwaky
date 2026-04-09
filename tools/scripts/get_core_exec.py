import urllib.request, json, ssl, os
from deploy_akibot import headers

url = 'https://n8n.akiwaky.cloud/api/v1/executions/658?includeData=true'
req = urllib.request.Request(url, headers=headers())

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())
    with open('../last_core.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print("Saved exec 658")
