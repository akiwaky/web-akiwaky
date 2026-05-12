# Integration: n8n Automation Engine

## Overview
n8n is the operational core of the application. It acts as the API gateway, microservice runtime, and scheduling engine.

## Environment Breakdown
- **Location:** Hosted sequentially on a VPS, exposed via Cloudflare Tunnel.
- **Address:** `n8n.akiwaky.cloud` (UI Dashboard) / `webhooks.akiwaky.cloud` (Execution Endpoints).
- **Type:** Docker-based, multi-container (n8n + PostgreSQL for n8n's internal memory/execution logs).

## Key Workflow Patterns
1. **Webhook Catch-Alls:** Webhook nodes are set to `POST`, capturing JSON body data sent from frontend integration wrappers (e.g., dedicated modules under `src/integrations/`). They are secured via CORS origins (allowing only `akiwaky.cloud` and `localhost:3000`).
2. **Cron Triggers:** The Daily Briefing workflow triggers every morning at 07:00 AM CDMX time based on the n8n Cron node, bypassing any external network requests entirely.
3. **LLM Orchestration:** "Basic LLM" nodes are used to abstract OpenAI/Anthropic API calls, parsing system messages and chaining output formats dynamically.

## Version Control
n8n workflows are JSON definitions. Critical workflows should be exported manually through the UI (Download JSON) and committed to the `tools/scripts/n8n_workflows/` directory to act as a git-tracked backup.
