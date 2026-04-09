import os, json, urllib.request, ssl, sys
ctx = ssl.create_default_context()
exec_id = sys.argv[1] if len(sys.argv) > 1 else '1084'
req = urllib.request.Request(
    f'https://n8n.akiwaky.cloud/api/v1/executions/{exec_id}?includeData=true',
    headers={
        'X-N8N-API-KEY': os.environ.get('N8N_API_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYzc4MDVjYi04Y2JmLTQzNjUtYTViYi0xZGMzYTE1OWUyNDkiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMzRkNzYxOTEtODM2ZS00ZjczLTkwMTctOTE2MGZjMDUxNGMwIiwiaWF0IjoxNzczMDAzNTY2fQ.dctlc9JAfv7grwSxvzvIJpivVuGwDbsnEKHHtQG00f4'),
        'CF-Access-Client-Id': os.environ.get('CF_ACCESS_CLIENT_ID', 'd05d9aff866cd191e550f62c4923e3d8'),
        'CF-Access-Client-Secret': os.environ.get('CF_ACCESS_CLIENT_SECRET', '7fec66c70907c9fdd7ca1034fbc361f45d116b8c9e860923dca6e8757cf17b65'),
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }
)
try:
    resp = urllib.request.urlopen(req, context=ctx)
    data = json.loads(resp.read().decode())
    # Find the node with an error
    error_data = data.get('data', getattr(data, 'data', data))
    if 'data' in error_data and 'resultData' in error_data['data']:
        error_node = error_data['data']['resultData'].get('error')
        if error_node:
            print("ERROR:")
            print(json.dumps(error_node, indent=2))
        else:
            print("No top level error. Checking last node...")
            print(json.dumps(error_data['data']['resultData']['lastNodeExecuted'], indent=2))
    else:
        print(json.dumps(error_data, indent=2)[:1000])
except Exception as e:
    print(e)
