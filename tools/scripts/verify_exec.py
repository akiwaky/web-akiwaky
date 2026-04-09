import urllib.request, json, ssl, sys, os

sys.path.append(os.getcwd())
try:
    from tools.scripts.deploy_akibot import headers
except ImportError:
    pass # Wait, headers() requires the environment variables

url = 'https://n8n.akiwaky.cloud/api/v1/executions?limit=1'
req = urllib.request.Request(url, headers=headers())
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        if 'data' in data and len(data['data']) > 0:
            exec_id = data['data'][0]['id']
            print('Last execution ID:', exec_id)
            url2 = f'https://n8n.akiwaky.cloud/api/v1/executions/{exec_id}?includeData=true'
            req2 = urllib.request.Request(url2, headers=headers())
            with urllib.request.urlopen(req2) as r2:
                detail = json.loads(r2.read().decode())
                with open('last_exec.json', 'w') as f:
                    json.dump(detail, f, indent=2)
                print('Saved last_exec.json')
        else:
            print('No executions found.')
except Exception as e:
    print('ERROR:', e.read().decode() if hasattr(e, 'read') else str(e))
