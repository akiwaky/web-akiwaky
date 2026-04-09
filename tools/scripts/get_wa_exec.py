import urllib.request, json, sys, os
sys.path.append(os.path.dirname(__file__))
from deploy_akibot import headers

url_e = 'https://n8n.akiwaky.cloud/api/v1/executions/937?includeData=true'
req_e = urllib.request.Request(url_e, headers=headers())
try:
    with urllib.request.urlopen(req_e) as resp_e:
        e_data = json.loads(resp_e.read().decode())
        with open(os.path.join(os.path.dirname(__file__), 'debug_wa_exec_937.json'), 'w') as f:
            json.dump(e_data, f, indent=2)
        print('Saved debug_wa_exec_937.json')
except Exception as e:
    print('Error:', e)
