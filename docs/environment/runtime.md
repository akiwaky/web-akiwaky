# Runtime Environment Configuration

## 1. Local Environment Configuration
The project uses a configuration-driven approach. Most business logic variables are stored natively in TypeScript objects:
- `src/config/music.ts`: Contains WhatsApp numbers, regular price anchors, n8n webhook URLs, and other settings.
- `src/config/chaty.ts`: Multi-assistant WhatsApp hub config (Aki-Chaty, Minerva, CompaBot).

## 2. Build & Deployment
- **Commands**:
  - `npm run dev`: Start local development server.
  - `npm run build`: Perform a production build (optimizes images, minifies code, generates static pages).
  - `npm run lint`: Run ESLint for code quality checks.

## 3. n8n Infrastructure
- **Server URL**: `https://n8n.akiwaky.cloud/`
- **Webhook Base URL**: `https://webhooks.akiwaky.cloud/`
- **Integration**: Model Context Protocol (MCP) server for live workflow interaction.
- **Security Notice**: Do NOT commit `.mcp.json`, `mcp.json`, `.agent/mcp.json`, or script files like Python or PowerShell that container MCP configuration secrets. These files contain sensitive `N8N_API_KEY` and `CF-Access-Client-Secret` headers required to bypass Cloudflare Zero Trust.

## 4. Static Site Generation (SSG)
All pages utilize Next.js Static Generation where possible to ensure near-instant load times and optimized SEO performance.
