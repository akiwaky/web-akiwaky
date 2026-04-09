# ADR 003: Authentication Strategy & Edge Security

**Status:** Accepted
**Date:** 2024-03-08

## Context
The ecosystem has public-facing landing pages (Vercel) but requires strict, secure access to the backend automation layer (n8n API and UI) and internal dev tools. We must avoid maintaining custom authentication schemas or database-backed login portals.

## Decision
We delegate all backend authentication to **Cloudflare Zero Trust (Access)**.
- The n8n instance and any internal dashboards sit behind Cloudflare tunnels.
- Administrative access requires a successful Cloudflare JWT validation (enforced at the edge) before a request ever hits the server.
- The Next.js generic webhooks (`webhooks.akiwaky.cloud`) bypass this human auth but are restricted by CORS and/or simple header secrets where applicable.

## Consequences
- **Positive:** No custom authentication code or password hashing/storage logic in the application.
- **Positive:** Protection against DDoS and unauthorized scanning at the network edge.
- **Requirement:** Service accounts (like AI agents or external CI/CD) must authenticate automatically using `CF-Access-Client-Id` and `CF-Access-Client-Secret` headers to bypass the interactive login prompt.
