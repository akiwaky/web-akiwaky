# Runbook: Local Setup & Development

## 1. Prerequisites
- Node.js v20+
- Git
- `npm` or `pnpm`

## 2. Frontend Setup (Next.js)
1. Clone the repository: `git clone git@github.com:akiwaky/web-akiwaky.git`.
2. Install dependencies: `npm install`.
3. Verify environment variables. Usually, you only need default configurations as the webhooks target production n8n endpoints even during local dev.
4. Run the development server: `npm run dev`.
5. Access the site at `http://localhost:3000`.

## 3. Connecting the AI / MCP Server
To allow local AI agents (Cursor, Claude, or terminal agents) to interact with the production n8n logic:
1. Copy the MCP example configuration: `cp .mcp.json.example .mcp.json`
2. Generate an n8n API Key from your n8n Dashboard.
3. Paste the `N8N_API_KEY`, `CF_ACCESS_CLIENT_ID`, and `CF_ACCESS_CLIENT_SECRET` into `.mcp.json`.
4. Ensure `.mcp.json` is ignored by Git (do not commit it).

## 4. Linting & Formatting
Before committing any changes, run the code quality checks:
```bash
npm run type-check
npm run lint
```
