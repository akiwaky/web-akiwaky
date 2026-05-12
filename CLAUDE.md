# Claude Code — IDE Guide for Antigravity Repo-Web

This file configures Claude Code (the AI IDE) for this repository.
Read `AGENTS.md` for agent-specific architectural rules.

---

## Quick Commands

```bash
npm run dev          # Start local Next.js dev server (http://localhost:3000)
npm run build        # Production build (static export via next.config.ts output:"export")
npm run lint         # ESLint — run before every structural change
npm run test:unit    # Vitest unit tests
npm run test:e2e     # Playwright smoke tests
npm test             # Both test suites
```

---

## Project Layout

```
src/
  app/
    (main)/          # Root portfolio site "/"
    (subsites)/
      chaty/         # Chaty WhatsApp Hub "/chaty"
  components/        # Pure UI — no fetch() or business logic here
  config/            # Business data: phone numbers, Notion DB IDs
  lib/               # Shared utilities (cn, etc.)

tools/
  scripts/           # Ops scripts (PowerShell). Credentials via $env: only.

docs/
  architecture.md    # Frontend vs n8n/Notion boundary rules
  security-audit.md  # Security findings and remediation status
```

---

## Architectural Rules (summary — full rules in AGENTS.md)

1. **No `fetch()` in components.** External calls belong in dedicated integration wrappers.
2. **Config lives in `src/config/`** — never inline business data in components.
3. **Secrets via environment variables only.** Never hardcode tokens, JWTs, or API keys.
4. **Run `lint` + `build` before any structural move.**
5. **Tests alongside config changes** — update tests when modifying `src/config/*.ts`.

---

## MCP Tools Available in This Repo

Claude Code has access to the following MCP servers:

| MCP Server | Purpose |
|---|---|
| `n8n-mcp` | Create, update, test, and deploy n8n workflows directly |
| `Claude_Preview` | Live browser preview — screenshot, click, inspect |
| `Claude_in_Chrome` | Full browser control — navigate, fill forms, read DOM |
| `scheduled-tasks` | Create cron-style scheduled tasks |
| `mcp-registry` | Search and suggest MCP connectors |

### Using n8n MCP
Use `mcp__n8n-mcp__*` tools to manage workflows without leaving the editor:
- `n8n_list_workflows` — see all active workflows
- `n8n_get_workflow` — inspect a specific workflow JSON
- `n8n_create_workflow` / `n8n_update_full_workflow` — deploy changes
- `n8n_test_workflow` — trigger a test execution
- `n8n_autofix_workflow` — auto-repair broken node connections

### Using Preview / Chrome MCP
Use `mcp__Claude_Preview__*` or `mcp__Claude_in_Chrome__*` to:
- Take screenshots of running pages
- Verify responsive layouts
- Test form submissions and WhatsApp redirect links
- Inspect console errors live

---

## Environment Variables

Create `.env.local` (never commit) with:

```bash
# Notion DB IDs for the Chaty hub (browser-accessible, NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_CHATY_NOTION_PLACES_DB_ID=...
NEXT_PUBLIC_CHATY_NOTION_LOG_DB_ID=...

# Ops scripts only (not Next.js — set in shell session or PowerShell profile)
# $env:N8N_API_KEY = "<your-key>"
# $env:CF_ACCESS_TOKEN = "<your-cf-jwt>"
```

> Notion DB IDs in `src/config/chaty.ts` are still hardcoded as fallback.
> Migrating them fully to env vars is tracked in `docs/security-audit.md`.

---

## Subsite Architecture

Each subsite under `src/app/(subsites)/` is an independent conversion-focused page:

| Route | Config | Integrations | Backend |
|---|---|---|---|
| `/chaty` | `src/config/chaty.ts` | WhatsApp click-to-chat | n8n + Notion |

> The Arlet piano-teaching landing previously lived at `/music` here; it was
> extracted into the standalone `web-MusicArlet` repo and is deployed to
> `music.akiwaky.cloud` (staging) / final domain TBD (production).

---

## AI Skills

Specialized skills in `.agent/skills/` can be invoked via the Skill tool:

**Development**: `frontend-agent`, `backend-agent`, `qa-agent`, `debug-agent`
**n8n**: `n8n-node-configuration`, `n8n-workflow-patterns`, `n8n-mcp-tools-expert`
**Marketing/CRO**: `page-cro`, `copywriting`, `seo-audit`, `ab-test-setup`

---

## Security Checklist (before every commit)

- [ ] No hardcoded JWT/API keys in any `.ps1`, `.ts`, `.json` file
- [ ] No `dangerouslySetInnerHTML` without DOMPurify sanitization
- [ ] Webhook URLs in env vars, not inline config
- [ ] `.env.local` not staged (`git status` clean of env files)
- [ ] `tools/scripts/*.ps1` use `$env:` not literal tokens
