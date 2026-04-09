# Runtime Environment & Configuration

## 1. Local Development (`.env.local`)
The Next.js application is designed to run almost entirely without local environment variables.
However, API keys or analytics tokens for client-side tracking should be placed in `.env.local`.

Currently required for frontend builds: **None.**

## 2. CI/CD Environment (Vercel)
Variables must be declared in the Vercel Dashboard under **Project Settings > Environment Variables**.
- Avoid configuring variables here unless necessary for server-side rendering (SSR). Since we rely heavily on static logic and webhooks, Vercel envs are kept to a strict minimum.

## 3. Automation Layer Environment (n8n VPS)
This is where the actual sensitive secrets live. The n8n VPS `docker-compose.yml` mounts a dedicated `.env` file that handles the backend configuration.

### Critical Secrets Catalog (VPS only)
| Variable | Owner | Purpose | Risk |
|---|---|---|---|
| `POSTGRES_PASSWORD` | DB Admin | n8n internal database credential. | Critical |
| `N8N_ENCRYPTION_KEY` | Admin | Decrypts Notion/OpenAI API keys stored in the n8n DB. | Critical |
| `N8N_HOST` | DNS Admin | Hostname binding for webhook generation. | Low |
| `WEBHOOK_URL` | DNS Admin | Cloudflare assigned reverse proxy URL for external API callbacks. | Moderate |

## 4. Local AI Environment (`.mcp.json`)
For autonomous agents operating in this repository, access to the n8n instance is provided via the MCP server configuration.
- File: `.mcp.json` (Gitignored)
- Required Keys:
  - `N8N_API_KEY`: Scoped token from n8n Users dashboard.
  - `CF_ACCESS_CLIENT_ID`: Cloudflare Service Token ID.
  - `CF_ACCESS_CLIENT_SECRET`: Cloudflare Service Token Secret.

*Never commit `.mcp.json` or any `.env` files to git.*
