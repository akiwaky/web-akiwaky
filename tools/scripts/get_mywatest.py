import urllib.request, json, ssl, os
from deploy_akibot import headers

url = 'https://n8n.akiwaky.cloud/api/v1/workflows'
req = urllib.request.Request(url, headers=headers())
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        target_id = None
        for w in data.get('data', []):
            if 'mywa' in w.get('name', '').lower():
                target_id = w['id']
                print(f"Found {w['name']} (ID: {target_id})")
                break
        
        if target_id:
            url_w = f'https://n8n.akiwaky.cloud/api/v1/workflows/{target_id}'
            req_w = urllib.request.Request(url_w, headers=headers())
            with urllib.request.urlopen(req_w) as resp_w:
                w_data = json.loads(resp_w.read().decode())
                with open('MyWAtest.json', 'w', encoding='utf-8') as f:
                    json.dump(w_data, f, indent=2)
                print("Saved MyWAtest.json")
except Exception as e:
    print("Error:", e)
