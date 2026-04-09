# Runbook: Emergency Rollback

In the event of a catastrophic failure in production, follow these steps to restore service.

## 1. Frontend Rollback (Next.js)
If a bad UI commit breaks the site or causes massive 404s:
1. Log into the Vercel Dashboard for `akiwaky.cloud`.
2. Navigate to the **Deployments** tab.
3. Find the last known good deployment (marked with a green circle).
4. Click the three dots (options) and select **"Promote to Production"** or **"Instantly Rollback"**.
5. The site will revert to the previous code state in under 5 seconds without requiring a new git revert commit immediately.
6. Once stable, run `git revert <bad-commit-hash>` locally and push to cleanly reflect the change in history.

## 2. Backend Rollback (n8n Workflows)
If an n8n logic change causes infinite loops, WhatsApp API bans, or blank screens on form submits:
1. Access `n8n.akiwaky.cloud`.
2. Immediately toggle the problematic workflow to **Inactive**. This stops the bleeding.
3. Navigate to the workflow's **Executions** tab to diagnose the issue.
4. If the workflow was heavily modified, restore the previous version from the repository backups located in `/tools/scripts/n8n_workflows/`.
5. Import the JSON back into n8n and activate it.
