# ADR 007: Observability & Logging Strategy

**Status:** Accepted
**Date:** 2024-03-08

## Context
Because the system lacks a traditional unified backend application (like a massive Node/Django monolith), we must define how errors are caught, logged, and monitored across the Vercel-Cloudflare-n8n pipeline.

## Decision
We utilize a decentralized, platform-native observability strategy:
1. **Frontend Errors:** Vercel Analytics/Logs are used for client-side routing and component crashes.
2. **Network/Security Errors:** Cloudflare Dashboard monitors blocked requests, DDoS attempts, and authentication failures natively.
3. **Business Logic Errors:** n8n natively logs every execution and maintains execution histories. We leverage an "Error Trigger" workflow within n8n. If *any* critical workflow fails (e.g., Notion is down), the Error Workflow catches the failure and sends an immediate alert via Telegram or WhatsApp to the admin.

## Consequences
- **Positive:** No setup or maintenance of heavy logging stacks like ELK or Datadog required.
- **Positive:** Instant mobile notifications for actual business logic failures.
- **Negative:** Logs are decentralized; tracing a specific user session from Vercel through Cloudflare to n8n requires manual ID matching.
- **Mitigation:** Ensure Next.js frontend passes a unique interaction ID or timestamp in the webhook payload to correlate Vercel logs with n8n execution histories.
