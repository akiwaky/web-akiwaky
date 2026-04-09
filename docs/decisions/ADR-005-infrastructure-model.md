# ADR 005: Infrastructure Deployment Model

**Status:** Accepted
**Date:** 2024-03-08

## Context
The project needs to balance high performance for end-user landing pages with cost-effective, persistent compute for automation workflows.

## Decision
We adopt a hybrid infrastructure model:
1. **Frontend (Next.js):** Deployed to **Vercel** as a serverless application utilizing Static Site Generation (SSG). This guarantees edge-caching, instantaneous load times, and zero-configuration CI/CD directly from GitHub.
2. **Backend (n8n):** Deployed on a dedicated **VPS (Virtual Private Server)** running Docker. This provides cheap, persistent compute power to handle long-running workflows, rate-limited APIs, and large cron jobs that would timeout or become expensive on Vercel Serverless Functions.

## Consequences
- **Positive:** Best-in-class performance for web visitors; full control/low cost for background processing.
- **Positive:** Separation of concerns. A surge in traffic to the landing page cannot crash the n8n backend, and vice-versa.
- **Negative:** Slightly higher operational overhead to manage the VPS, Docker updates, and reverse proxy settings.
- **Mitigation:** Standardize the VPS deployment using Docker Compose and script the maintenance routines.
