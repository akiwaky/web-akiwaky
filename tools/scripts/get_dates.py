import urllib.request, json, os, sys
sys.path.append(os.path.dirname(__file__))
from deploy_akibot import headers
req = urllib.request.Request('https://n8n.akiwaky.cloud/api/v1/executions?limit=50', headers=headers())
resp = urllib.request.urlopen(req)
data = json.loads(resp.read().decode())['data']
for e in data:
    if e['workflowId'] in ["eoGvxHk5GmGIn8yY", "84CvFle3GYikUaYl"]:
        print(f"{e['id']} | {e['workflowId']} | {e['createdAt']}")
