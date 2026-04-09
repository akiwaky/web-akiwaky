# ADR 006: Automation & Orchestration Engine

**Status:** Accepted
**Date:** 2024-03-08

## Context
The ecosystem requires routing logic, data transformation between APIs (e.g., WhatsApp to Notion), and timed cron-style jobs (like the Daily Briefing). Maintaining custom Express/Next API routes quickly becomes a burden when dealing with 3rd party API updates, error retries, and rate limits.

## Decision
We chose **n8n** as the single orchestration engine and API Gateway for the entire ecosystem.
- All webhook requests from Next.js hit n8n.
- All scheduled jobs are handled by n8n Cron triggers.
- All API polling, data merging, and LLM calls are orchestrated visually.

## Consequences
- **Positive:** "Code-less" or low-code backend. Updates to logic are made visually and instantly deployed without waiting for a Next.js Vercel build.
- **Positive:** Built-in error handling, infinite loops prevention, and retry logic for brittle APIs.
- **Positive:** Workflows can be exported, versioned (like the `daily-briefing.json` backup), and analyzed by AI via the MCP server.
- **Negative:** Custom manipulation of complex data structures can be unwieldy in visual nodes compared to pure code.
- **Mitigation:** Leverage n8n's Code node and `$input.all()` logic when standard declarative nodes are insufficient.
