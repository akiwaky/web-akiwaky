import os, json, urllib.request, ssl
ctx = ssl.create_default_context()
req = urllib.request.Request(
    'https://n8n.akiwaky.cloud/api/v1/executions?limit=5',
    headers={
        'X-N8N-API-KEY': os.environ.get('N8N_API_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYzc4MDVjYi04Y2JmLTQzNjUtYTViYi0xZGMzYTE1OWUyNDkiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMzRkNzYxOTEtODM2ZS00ZjczLTkwMTctOTE2MGZjMDUxNGMwIiwiaWF0IjoxNzczMDAzNTY2fQ.dctlc9JAfv7grwSxvzvIJpivVuGwDbsnEKHHtQG00f4'),
        'CF-Access-Client-Id': os.environ.get('CF_ACCESS_CLIENT_ID', 'd05d9aff866cd191e550f62c4923e3d8'),
        'CF-Access-Client-Secret': os.environ.get('CF_ACCESS_CLIENT_SECRET', '7fec66c70907c9fdd7ca1034fbc361f45d116b8c9e860923dca6e8757cf17b65'),
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
)
try:
    resp = urllib.request.urlopen(req, context=ctx)
    data = json.loads(resp.read().decode())
    for ex in data.get('data', []):
        print(f"ID: {ex['id']}, Status: {ex.get('status')}, Workflow: {ex.get('workflowId')}, Finished: {ex.get('finished')}")
except Exception as e:
    print(e)
