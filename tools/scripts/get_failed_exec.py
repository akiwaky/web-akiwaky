import urllib.request, json, ssl, os
from deploy_akibot import headers

url = 'https://n8n.akiwaky.cloud/api/v1/executions?limit=10&includeData=true'
req = urllib.request.Request(url, headers=headers())

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        found = False
        for exec_data in data.get('data', []):
            if exec_data.get('status') == 'error':
                with open('last_fail.json', 'w', encoding='utf-8') as f:
                    json.dump(exec_data, f, indent=2)
                print(f"Saved failed exec {exec_data.get('id')} for {exec_data.get('workflowData', {}).get('name')}")
                found = True
                break
        if not found:
            print('No failed executions found in the last 10 runs.')
except Exception as e:
    print('ERROR:', e)
