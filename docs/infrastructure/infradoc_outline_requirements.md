# Infrastructure Documentation Outline — Requirements Specification

> This document defines **what information the infrastructure team must provide** to maintain a complete, auditable infrastructure inventory. Each section specifies required fields, example values, and why this information matters.

---

## 1. Domains and DNS

### What must be provided
- All registered domains and subdomains
- DNS provider and registrar
- DNS record types (A, CNAME, MX, TXT) with their targets
- TTL values
- DNSSEC status

### Example values
| Domain | Type | Target | TTL | Provider |
|---|---|---|---|---|
| `akiwaky.cloud` | A | `203.0.113.10` | 300 | Cloudflare |
| `n8n.akiwaky.cloud` | CNAME | `tunnel-id.cfargotunnel.com` | Auto | Cloudflare |
| `webhooks.akiwaky.cloud` | CNAME | `tunnel-id.cfargotunnel.com` | Auto | Cloudflare |

### Why this matters
AI agents and engineers need DNS context to debug routing issues, plan migrations, and understand the full attack surface.

---

## 2. Infrastructure Hosts

### What must be provided
- VPS/cloud provider name
- Region and data center
- Account identifier (non-sensitive)
- Managed services in use (object storage, managed DB, etc.)

### Example values
| Service | Provider | Region | Account |
|---|---|---|---|
| VPS | Hetzner | eu-central-1 | `proj-akiwaky` |
| DNS/CDN | Cloudflare | Global | `akiwaky` |

### Why this matters
Understanding the hosting topology is essential for capacity planning, cost management, and disaster recovery.

---

## 3. VPS Specifications

### What must be provided
- Server hostname / identifier
- CPU, RAM, disk specs
- IP addresses (public and private)
- Purpose / role of each server

### Example values
| Hostname | CPU | RAM | Disk | Public IP | Role |
|---|---|---|---|---|---|
| `vps-1` | 4 vCPU | 8 GB | 80 GB NVMe | `203.0.113.10` | n8n + reverse proxy |

### Why this matters
Resource constraints directly affect application performance and scaling decisions.

---

## 4. Operating Systems

### What must be provided
- OS name and version per server
- Kernel version
- Node.js / Python / runtime versions installed
- Package manager used
- Auto-update policy

### Example values
| Server | OS | Kernel | Node.js | Update Policy |
|---|---|---|---|---|
| `vps-1` | Ubuntu 24.04 LTS | 6.5.0 | 20.x LTS | `unattended-upgrades` |

### Why this matters
OS version determines security patch availability, compatibility, and end-of-life planning.

---

## 5. Reverse Proxy / Gateway

### What must be provided
- Proxy software (nginx, Caddy, Traefik, Cloudflare Tunnel)
- Configuration file locations
- Routing rules (domain → upstream service + port)
- SSL/TLS termination point
- Rate limiting rules

### Example values
| Domain | Proxy | Upstream | TLS |
|---|---|---|---|
| `n8n.akiwaky.cloud` | Cloudflare Tunnel | `localhost:5678` | CF Edge |
| `akiwaky.cloud` | Cloudflare CDN | Static files | CF Edge |

### Why this matters
Proxy misconfiguration is a top cause of outages and security vulnerabilities.

---

## 6. Cloudflare Configuration

### What must be provided
- Account and zone identifiers (non-sensitive)
- Access policies (Zero Trust applications)
- Tunnel IDs and target services
- WAF rules
- Cache rules
- Page rules
- Workers or Worker Routes

### Example values
| Component | Configuration |
|---|---|
| Zero Trust App | `n8n-admin` → email OTP for `n8n.akiwaky.cloud` |
| Tunnel | `tunnel-xyz` → `localhost:5678` |
| WAF | Default managed rules |

### Why this matters
Cloudflare is the security and performance boundary for all public traffic. Misconfigurations can expose internal services.

---

## 7. Allowed IP Ranges

### What must be provided
- IP allowlists for admin services
- IP allowlists for webhook sources (if any)
- Geo-blocking rules
- VPN or bastion host IPs

### Example values
| Rule | IPs | Purpose |
|---|---|---|
| n8n admin | `CF Zero Trust only` | No direct IP access |
| Webhook ingress | `0.0.0.0/0` | Public |

### Why this matters
IP restrictions are a layer of defense-in-depth. Documenting them prevents accidental lockouts.

---

## 8. Webhook Endpoints

### What must be provided
- Complete list of active webhook URLs
- HTTP method and expected payload schema
- Authentication mechanism (none, token, signature)
- Rate limiting
- Associated n8n workflow ID

### Example values
| Endpoint | Method | Auth | Workflow |
|---|---|---|---|
| `/webhook/daily-briefing` | GET | CORS whitelist | daily-briefing |
| `/webhook-test/music/test-lead` | POST | None (test) | music-leads |

### Why this matters
Webhooks are the primary attack surface for the backend. Undocumented endpoints create shadow API risk.

---

## 9. Automation Services (e.g., n8n)

### What must be provided
- n8n version
- Deployment method (Docker, bare metal, cloud)
- Database backend (SQLite, PostgreSQL)
- Active workflow count and list
- Credential types in use
- Execution mode (main, queue)
- MCP server configuration

### Example values
| Property | Value |
|---|---|
| Version | `1.72.1` |
| Deployment | Docker on VPS |
| Database | SQLite |
| Active workflows | 5 |
| MCP Mode | StreamableHTTP via supergateway |

### Why this matters
n8n is the central automation layer. Version, database, and execution mode affect reliability and scalability.

---

## 10. External API Access

### What must be provided
- All third-party APIs consumed
- API tier/plan
- Rate limits
- Credential type (API key, OAuth, service account)
- Usage patterns (batch, real-time, scheduled)

### Example values
| API | Tier | Rate Limit | Auth | Usage |
|---|---|---|---|---|
| OpenAI | Pay-as-you-go | 10k RPM | API Key | Real-time chat |
| Notion | Free Integration | 3 req/sec | Bearer token | CMS reads |
| OpenWeatherMap | Free tier | 60/min | API Key | Scheduled |
| TheSportsDB | Free/Patreon | Varies | API Key | Scheduled |

### Why this matters
API dependency mapping is critical for cost control, outage impact analysis, and security audits.

---

## 11. Secrets Management

### What must be provided
- Secret storage mechanism (env vars, vault, n8n credentials, etc.)
- List of all secrets by name (not values)
- Rotation schedule
- Access control per secret

### Example values
| Secret Name | Storage | Rotation | Access |
|---|---|---|---|
| `N8N_API_KEY` | Local env var | Manual | Developer only |
| `CF-Access-Client-Secret` | Local env var | Manual | Developer only |
| Notion API Token | n8n credentials | Never | n8n only |

### Why this matters
Secret sprawl is the #1 cause of security breaches. An inventory enables auditing and rotation.

---

## 12. Backup Strategy

### What must be provided
- What is backed up (n8n DB, workflows, Notion data, source code)
- Backup frequency
- Retention period
- Backup location
- Recovery procedure (tested?)

### Example values
| Asset | Frequency | Retention | Location | Tested |
|---|---|---|---|---|
| n8n SQLite DB | Daily | 30 days | Object storage | ❌ |
| Git repo | Per commit | Indefinite | GitHub | ✅ |

### Why this matters
Without documented backups, disaster recovery is guesswork.

---

## 13. Monitoring / Observability

### What must be provided
- Monitoring tools in use (or "none")
- Uptime monitoring endpoints
- Log aggregation setup
- Alerting channels (email, Slack, WhatsApp, PagerDuty)
- Key metrics tracked

### Example values
| Tool | Purpose | Endpoints |
|---|---|---|
| UptimeRobot | Uptime checks | `akiwaky.cloud`, `n8n.akiwaky.cloud` |
| Cloudflare Analytics | Traffic + WAF | All zones |
| None | Log aggregation | — |

### Why this matters
Without monitoring, failures are detected by users rather than the team. Observability is non-negotiable for production systems.
