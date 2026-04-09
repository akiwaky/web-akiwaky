# Infrastructure Inventory

> **Last Updated**: _YYYY-MM-DD_
> **Updated By**: _Name / Role_
>
> This is the **actual infrastructure inventory**. Fill each section with current production values.
> Refer to `infradoc_outline_requirements.md` for field definitions and guidance.

---

## 1. Domains

| Domain | Type | Target | TTL | Registrar | Notes |
|---|---|---|---|---|---|
| `akiwaky.cloud` | | | | | Main site |
| `n8n.akiwaky.cloud` | | | | | n8n admin |
| `webhooks.akiwaky.cloud` | | | | | Webhook ingress |
| | | | | | |

---

## 2. Services

| Service | URL / Endpoint | Port | Status | Notes |
|---|---|---|---|---|
| Next.js (production) | `https://akiwaky.cloud` | | ☐ Live | |
| n8n instance | `https://n8n.akiwaky.cloud` | | ☐ Live | |
| n8n webhooks | `https://webhooks.akiwaky.cloud` | | ☐ Live | |
| | | | | |

---

## 3. Servers

| Hostname | Provider | Region | CPU | RAM | Disk | Public IP | OS | Role |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

---

## 4. Firewall Rules

| Rule Name | Direction | Protocol | Port(s) | Source | Destination | Action |
|---|---|---|---|---|---|---|
| | | | | | | |

---

## 5. Cloudflare Configuration

### Zero Trust Applications

| App Name | Hostname | Auth Method | Allowed Users |
|---|---|---|---|
| `n8n-admin` | `n8n.akiwaky.cloud` | | |

### Tunnels

| Tunnel Name/ID | Target Service | Port | Status |
|---|---|---|---|
| | | | |

### WAF / Page Rules

| Rule | Scope | Action |
|---|---|---|
| | | |

---

## 6. Automation Platforms

### n8n

| Property | Value |
|---|---|
| Version | |
| Deployment Method | |
| Database Backend | |
| Execution Mode | |
| Active Workflows | |
| MCP Enabled | ☐ Yes / ☐ No |

### Active Workflows

| Workflow ID | Name | Trigger Type | Status |
|---|---|---|---|
| | | | |

---

## 7. Environment Variables

### Production

| Variable | Service | Description | Where Set |
|---|---|---|---|
| `N8N_API_KEY` | n8n | API authentication | |
| `CF-Access-Client-Id` | Cloudflare | Zero Trust service token | |
| `CF-Access-Client-Secret` | Cloudflare | Zero Trust service token | |
| | | | |

### Development (local)

| Variable | Description | Where Set |
|---|---|---|
| | | |

---

## 8. Security Controls

### Authentication

| System | Auth Mechanism | MFA | Notes |
|---|---|---|---|
| n8n Admin | Cloudflare Zero Trust | ☐ Yes / ☐ No | |
| Webhooks | | | |
| GitHub | | | |

### Secrets Inventory

| Secret Name | Storage Location | Last Rotated | Rotation Policy |
|---|---|---|---|
| `N8N_API_KEY` | | | |
| `CF-Access-Client-Secret` | | | |
| Notion API Token | | | |
| OpenAI API Key | | | |
| OpenWeatherMap Key | | | |
| | | | |

---

## 9. External APIs

| API | Tier/Plan | Rate Limit | Auth Type | Used By |
|---|---|---|---|---|
| OpenAI / Anthropic | | | | n8n chatbots |
| Notion | | | | CMS / database |
| OpenWeatherMap | | | | Daily briefing |
| TheSportsDB | | | | Daily briefing |
| Meta WhatsApp Business | | | | `/norte`, `/chaty` |

---

## 10. Backup & Recovery

| Asset | Frequency | Retention | Location | Last Tested |
|---|---|---|---|---|
| n8n database | | | | |
| n8n workflow exports | | | | |
| Source code | Git | Indefinite | GitHub | — |

---

## 11. Monitoring & Observability

| Tool | Purpose | Endpoints Monitored | Alerting Channel |
|---|---|---|---|
| | Uptime | | |
| | Logs | | |
| | Metrics | | |
