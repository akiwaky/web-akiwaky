# ADR 001: Initial Architecture & Separation of Concerns

**Status:** Accepted
**Date:** 2024-03-08

## Context
The project required a scalable way to launch multiple isolated landing pages and WhatsApp-driven utilities (Pal Norte, Chaty hub) under a single domain ecosystem without maintaining a complex, monolithic backend.

## Decision
We adopted a purely headless architecture defined by strict boundaries:
- **Presentation Layer:** Next.js (App Router) deployed on Vercel. Handles UI, SSG, and configuration routing. *Strictly no backend logic or databases.*
- **Logic & Execution Layer:** n8n deployed on a dedicated VPS. Acts as the API gateway, microservice router, and integration engine.
- **Data Layer:** Notion. Serves as both a CMS (content management system) and a relational database.

## Consequences
- **Positive:** Zero backend code maintenance. Unmatched speed to market. Visual debugging of logic flows via n8n.
- **Positive:** Vercel edge caching makes frontends incredibly fast and resilient to traffic spikes.
- **Negative:** Heavy reliance on external APIs (Notion, n8n) can introduce latency for dynamic requests.
- **Mitigation:** Frontends fetch static config; dynamic requests are fired asynchronously via webhooks so the user is not blocked.
