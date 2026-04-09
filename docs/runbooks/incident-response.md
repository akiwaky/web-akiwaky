# Runbook: Incident Response Playbook

## P0: Entire Site is Down (5xx Errors)
**Symptoms:** Subsites (`/music` etc.) throw 500 or 502 Bad Gateway errors.
**Triage Steps:**
1. Check **Vercel Dashboard**. Is the `main` deployment failing? (Fix: Rollback Vercel to previous commit).
2. If Vercel is green, check **Cloudflare Dashboard**. Is the domain routing properly? (Fix: Verify DNS records pointing to Vercel).

## P1: Automations or Forms Failing Silently
**Symptoms:** Site loads perfectly, but clicking "Submit" on a webhook form does nothing, or WhatsApp bot is completely unresponsive.
**Triage Steps:**
1. Open the Network tab in the browser (F12). Click the submit button.
2. If `fetch` to `webhooks.akiwaky.cloud` returns **CORS Error** or **502 Bad Gateway**:
   - The n8n VPS is down or the Cloudflare Tunnel is disconnected.
   - SSH into the VPS and run `docker compose logs -f tunnel`.
   - Ensure the VPS has not run out of memory.
3. If `fetch` returns **200 OK** but nothing happens:
   - The n8n instance received the data but the workflow failed mid-execution.
   - Log into `n8n.akiwaky.cloud`.
   - Open the specific workflow causing issues.
   - Go to the "Executions" tab to see the exact node that threw the error (Usually Notion API timeout or OpenAI credit exhaustion).

## P2: WhatsApp Bot Halts During Conversation
**Symptoms:** Bot replies initially but stops midway through a flow.
**Triage Steps:**
1. This is almost always an external API timeout.
2. Check the "Executions" tab in n8n. If the OpenAI node failed due to "Rate Limit" or "Insufficient Quota", the conversation halts.
3. Fix: Refill OpenAI credits or switch the model fallback node.
