# Daily Briefing Configuration

The `/daily` route is designed to pull a live briefing from your n8n server. This document covers setting up the backend workflow to fulfill that request.

## Frontend Configuration
The frontend fetches the briefing from a centralized webhook URL defined in `src/config/daily.ts`.
By default, this is: `https://webhooks.akiwaky.cloud/webhook/daily-briefing`

If you change the endpoint path, update the fallback in that file.

## n8n Workflow Setup

An automated workflow JSON file has been created at `docs/n8n/daily-briefing.json`. 

### Import the Workflow
1. Open your n8n instance at `https://n8n.akiwaky.cloud/`.
2. Create a new workflow.
3. In the top-right menu, select **Import from File** and select `daily-briefing.json` (or copy-paste its contents into the visual canvas).

### Configure Credentials
The workflow uses several APIs. You must attach your own credentials for them to work:

1. **Weather Node (OpenWeatherMap)**:
   - Create a new generic HTTP credential or OpenWeatherMap API credential in n8n.
   - Enter your OpenWeatherMap API Key.
   - Attach it to the `Fetch Weather` HTTP node.

2. **Sports Nodes (TheSportsDB)**:
   - You can use the free/pateron tier key `123`.
   - Update the placeholder credentials on the `Fetch LigaMX`, `Fetch NFL`, and `Fetch NBA` nodes if you purchase a dedicated key.

### Activate the Webhook
- Once the credentials are solid, click **Test Workflow** in n8n to ensure it works.
- If it's green across the board, flip the toggle to **Active** in the top right. 
- Ensure your Cloudflare setup properly routes `https://webhooks.akiwaky.cloud/webhook/daily-briefing` through to your VPS's n8n port.

## Production Support & Security
- **CORS Support**: The `Respond to Webhook` node explicitly allows queries from `https://akiwaky.cloud`. If you are developing locally, it accepts `http://localhost:3000` via a whitelist.
- **Fail Gracefully**: If the Reddit API or Sports DB drops a request, the `Continue On Fail` mechanism in the HTTP nodes ensures your frontend still receives the *other* valid modules.

*Generated via AI Agent Architecture*
