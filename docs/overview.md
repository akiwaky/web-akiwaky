# System Overview

## Purpose
The Alejandro AG Web Ecosystem is a multi-purpose, headless web architecture designed to serve different personal and professional identities under a single monolithic repository. It acts as a lightweight frontend (Next.js) powered entirely by headless automation (n8n) and a headless CMS (Notion).

## Value Proposition
This architecture prioritizes:
1. **Zero-Maintenance Backend**: No traditional databases (PostgreSQL/MySQL) or custom backend APIs are maintained. Everything runs through n8n visual workflows.
2. **Instant Performance**: Next.js App Router with Static Site Generation (SSG) ensures that all landing pages load instantly, even on poor mobile connections.
3. **Conversational First**: Most user interactions bypass traditional forms, routing users directly into WhatsApp conversations powered by n8n microservices.
4. **AI-Operable**: The system is designed to be maintained, extended, and monitored by autonomous AI agents (like the ones operating in this repository).

## Target Audience
The system serves distinct audiences based on the subsite:
- **`/music`**: Parents and adult students seeking high-end piano instruction in CDMX (High conversion, luxury aesthetic).
- **`/norte`**: Festival attendees at Pal Norte needing low-bandwidth, text-based utility information (High utility, mobile-first, zero-asset design).
- **`/chaty`**: Locals and tourists in CDMX looking for curated place recommendations via WhatsApp (Discovery, lifestyle).
- **`/daily`**: Personal use; an automated daily briefing aggregation.

## System Topology Summary
- **Frontend**: `akiwaky.cloud` (Vercel / Next.js)
- **Automation / API Gateway**: `n8n.akiwaky.cloud` + `webhooks.akiwaky.cloud` (VPS / n8n)
- **Database / CMS**: Notion integration
- **Edge Security**: Cloudflare Zero Trust

*For detailed architectural boundaries, read `architecture.md`.*
