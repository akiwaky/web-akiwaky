import urllib.request, json, sys, os
sys.path.append(os.path.dirname(__file__))
from deploy_akibot import headers

# ID for AkiBot - Classify Intent is eoGvxHk5GmGIn8yY
url = 'https://n8n.akiwaky.cloud/api/v1/executions?limit=20'
req = urllib.request.Request(url, headers=headers())
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        exec_id = None
        for execution in data.get('data', []):
            if execution.get('workflowId') == 'eoGvxHk5GmGIn8yY':
                exec_id = execution['id']
                break
                
        if exec_id:
            print(f'Fetching latest Classify Intent execution details: {exec_id}')
            url_e = f'https://n8n.akiwaky.cloud/api/v1/executions/{exec_id}?includeData=true'
            req_e = urllib.request.Request(url_e, headers=headers())
            with urllib.request.urlopen(req_e) as resp_e:
                e_data = json.loads(resp_e.read().decode())
                with open(os.path.join(os.path.dirname(__file__), 'debug_classify_exec.json'), 'w') as f:
                    json.dump(e_data, f, indent=2)
                print('Saved debug_classify_exec.json')
except Exception as e:
    print('Error:', e)
