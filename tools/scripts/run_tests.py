import urllib.request
import json
import ssl
import time

results = []
ctx = ssl.create_default_context()

for i in range(12):
    time.sleep(5)
    url = f"https://webhooks.akiwaky.cloud/webhook/akibot-test?fixture={i}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = json.loads(resp.read().decode())
            results.append(data)
            
            # Print test output
            name = data.get('fixture_name', f'test_{i}')
            overall = data.get('overall_pass', False)
            print(f"Test {i} ({name}): {'PASS' if overall else 'FAIL'}")
            if not overall:
                print(f"  - Intent pass: {data.get('pass_intent')} (Expected: {data.get('expected_intent')}, Got: {data.get('actual_intent')})")
                print(f"  - Response pass: {data.get('pass_response')} (Expected: {data.get('expected_response_exact') or data.get('expected_response_contains')}, Got: {data.get('actual_response_text')})")
                print(f"  - KB Hit pass: {data.get('pass_kb_hit')} (Expected: {data.get('expected_kb_hit')}, Got: {data.get('actual_kb_hit')})")
                print(f"  - Needs Human pass: {data.get('pass_needs_human')} (Expected: {data.get('expected_needs_human')}, Got: {data.get('actual_needs_human')})")
            
    except Exception as e:
        err_msg = str(e)
        if hasattr(e, 'read'):
            raw = e.read().decode('utf-8')
            err_msg += f" | {raw}"
        elif 'resp' in locals() and hasattr(resp, 'read') and not getattr(e, 'read', False):
            # well if JSONDecodeError didn't have read()
            try:
                # resp is bound to with block but maybe it's still alive... no, wait.
                pass
            except:
                pass
        print(f"Test {i} failed: {err_msg}")
        results.append({"error": err_msg, "fixture": i})

with open("test_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
    
print(f"All 12 tests finished. See test_results.json for details.")
