import urllib.request, json, os, sys
sys.path.append(os.path.dirname(__file__))
from deploy_akibot import headers

req = urllib.request.Request('https://n8n.akiwaky.cloud/api/v1/workflows', headers=headers())
resp = urllib.request.urlopen(req)
data = json.loads(resp.read().decode())['data']
for w in data:
    print(f"{w['id']} : {w['name']}")
