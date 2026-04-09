import urllib.request, json, os, sys
sys.path.append(os.path.dirname(__file__))
from deploy_akibot import headers

req = urllib.request.Request('https://n8n.akiwaky.cloud/api/v1/workflows/8MP8dBAGYwzc5Gqr', headers=headers())
resp = urllib.request.urlopen(req)
data = json.loads(resp.read().decode())
with open('c:/Antigravity/Repo-Web/tools/scripts/akichaty-intent.json', 'w') as f:
    json.dump(data, f, indent=2)
