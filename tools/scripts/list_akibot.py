import urllib.request
import json
import ssl
import sys

API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYzc4MDVjYi04Y2JmLTQzNjUtYTViYi0xZGMzYTE1OWUyNDkiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMzRkNzYxOTEtODM2ZS00ZjczLTkwMTctOTE2MGZjMDUxNGMwIiwiaWF0IjoxNzczMDAzNTY2fQ.dctlc9JAfv7grwSxvzvIJpivVuGwDbsnEKHHtQG00f4"
BASE_URL = "https://n8n.akiwaky.cloud"
CF_CLIENT_ID = "d05d9aff866cd191e550f62c4923e3d8"
CF_CLIENT_SECRET = "7fec66c70907c9fdd7ca1034fbc361f45d116b8c9e860923dca6e8757cf17b65"

headers = {
    "X-N8N-API-KEY": API_KEY,
    "CF-Access-Client-Id": CF_CLIENT_ID,
    "CF-Access-Client-Secret": CF_CLIENT_SECRET,
    "Accept": "application/json"
}

req = urllib.request.Request(f"{BASE_URL}/api/v1/workflows?limit=100", headers=headers)
ctx = ssl.create_default_context()

try:
    with urllib.request.urlopen(req, context=ctx) as response:
        data = json.loads(response.read().decode())
        for wf in data.get("data", []):
            if "AkiBot" in wf.get("name", ""):
                print(f"{wf['name']}: {wf['id']}")
except Exception as e:
    print(f"Error: {e}")
