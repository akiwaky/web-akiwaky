# Runbook: Deployment

This repository separates frontend deployments from backend (n8n) logic deployments.

## 1. Frontend (Next.js on Vercel)
The Vercel pipeline is fully automated and triggered by GitHub webhooks.

### Standard Production Deploy
1. Ensure all code tests pass locally (`npm run build`).
2. Commit and push changes to the `main` branch.
3. Vercel will automatically build and deploy `akiwaky.cloud` within 60 seconds.

### Preview Branches
1. Push any feature branch (e.g., `feat/new-music-pricing`) to GitHub.
2. Vercel will generate an isolated preview URL (e.g., `web-akiwaky-git-feat-new-music.vercel.app`) for testing.

## 2. Backend (n8n on VPS)
Logic changes in n8n do not require a Next.js deployment. They are instant.

### Standard Workflow Update
1. Access `n8n.akiwaky.cloud` and authenticate via Cloudflare Zero Trust.
2. Edit the required workflow (e.g., "Aki-Chaty Responder").
3. Test the execution manually within the n8n UI.
4. Set the workflow to **Active**. The webhook is immediately live for production.

### Backup & Version Control
Because n8n saves directly to its local PostgreSQL database, we must manually version control critical workflows.
1. In the n8n UI, click `Download JSON`.
2. Save the file to `/tools/scripts/n8n_workflows/` in this repository.
3. Commit the JSON to git as a hard backup.
