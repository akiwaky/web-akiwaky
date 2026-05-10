# Security Audit — Antigravity Repo-Web

**Audit Date:** 2026-03-13
**Auditor:** Claude Code (automated + manual review)
**Branch:** `claude/funny-cerf`

---

## Executive Summary

Three categories of issues were found: hardcoded credentials in tracked scripts (CRITICAL, now fixed), unsanitized HTML injection from a trusted webhook (HIGH), and hardcoded service URLs/IDs in frontend config (MEDIUM). The critical issues have been remediated in this commit.

---

## Findings

### CRITICAL — Hardcoded credentials in tracked PowerShell scripts

**Status: FIXED in this commit**

**Affected files (all 6 scripts in `tools/scripts/`):**
- `deploy_all_n8n.ps1`
- `debug_api.ps1`
- `list_n8n_cf.ps1`
- `list_workflows.ps1`
- `test_webhook.ps1`
- `create_palnorte_workflows.ps1`

**What was exposed:**
- Cloudflare Access JWT (`CF_Authorization` cookie) — full token, email `akiwaky@gmail.com`
- n8n API Key (JWT) — full token for `https://n8n.akiwaky.cloud/api/v1`

**What was done:**
All hardcoded tokens replaced with `$env:CF_ACCESS_TOKEN` and `$env:N8N_API_KEY` environment variable references. Scripts now exit with an error if the env vars are not set.

**Remaining action for repo owner:**
> The tokens were committed to git history. Even though the files are now clean,
> the tokens exist in past commits. You MUST:
> 1. Rotate the n8n API key immediately at `https://n8n.akiwaky.cloud/settings/api`
> 2. Revoke / re-issue the Cloudflare Access token at your Cloudflare Zero Trust dashboard
> 3. Review n8n access logs for unauthorized executions
> 4. Optionally rewrite git history with `git filter-repo` to remove the tokens from history

---

### HIGH — Unsanitized HTML injection via `dangerouslySetInnerHTML`

**Status: Resolved (page deleted)**

The `/daily` subsite that contained the `dangerouslySetInnerHTML` was deleted
during subsite consolidation. No remaining page in this repo injects HTML
returned from a webhook.

(Original finding, kept for audit history below.)

**File:** `src/app/(subsites)/daily/page.tsx:193`

```tsx
dangerouslySetInnerHTML={{ __html: briefingHtml }}
```

**Source:** Daily page used a frontend wrapper that fetched raw HTML from an n8n webhook and returned it as a string. The string was injected directly into the DOM.

**Risk:** If the n8n server is compromised or the response is intercepted (MITM), arbitrary JavaScript executes in the user's browser (stored/reflected XSS).

**Recommended fix:**
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```
```tsx
import DOMPurify from 'dompurify';
// ...
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(briefingHtml) }}
```

---

### MEDIUM — Hardcoded webhook URLs in frontend config

**Status: Resolved (subsites removed)**

The previously affected configs (`src/config/daily.ts`, `src/config/music.ts`)
are no longer in this repo. `/daily` and `/norte` were consolidated into
`/chaty`; the `/music` subsite was extracted into the standalone
`web-MusicArlet` repository where the webhook URL is now read strictly from
`NEXT_PUBLIC_N8N_WEBHOOK_MUSIC` (no hardcoded fallback).

---

### MEDIUM — Notion database IDs in frontend bundle

**Status: Fixed**

**File:** `src/config/chaty.ts`

```ts
notionPlacesDbId: "31cf1ccf-f3d3-8191-9b49-c03faa9864dc",
notionLogDbId:    "31cf1ccf-f3d3-81e4-ad0b-fa852f3d7cbd",
```

**Risk:** Notion DB IDs are enumerable. If the Notion integration token is ever leaked, these IDs enable direct database access.

**Recommended fix:** Move to `NEXT_PUBLIC_CHATY_NOTION_PLACES_DB_ID` env var.

---

### LOW — Missing security headers

**Status: Open**

`next.config.ts` has `output: "export"` (static site). Security headers must be set at the CDN/Cloudflare layer rather than Next.js middleware.

**Recommended Cloudflare headers:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

---

### INFO — WhatsApp numbers in source

**Status: Acceptable / Monitor**

The WhatsApp number in `src/config/chaty.ts` is intentional (it drives WhatsApp click-to-chat links). Verify the production number before go-live.

---

## Remediation Roadmap

| Priority | Item | Owner | Status |
|---|---|---|---|
| P0 | Rotate n8n API key | Repo owner | **Open — do immediately** |
| P0 | Revoke Cloudflare JWT | Repo owner | **Open — do immediately** |
| P0 | Scripts use `$env:` vars | Claude Code | **Done** |
| P1 | Add DOMPurify to daily page | Dev | Done |
| P2 | Migrate webhook URLs to env vars | Dev | Done |
| P2 | Migrate Notion DB IDs to env vars | Dev | Done |
| P3 | Set security headers in Cloudflare | Infra | Open |

---

## OWASP Mapping

| ID | Name | Status |
|---|---|---|
| A02:2021 | Cryptographic Failures (exposed credentials) | Partially mitigated |
| A03:2021 | Injection (XSS via dangerouslySetInnerHTML) | Open |
| A05:2021 | Security Misconfiguration (missing headers) | Open |
| CWE-798 | Hard-coded Credentials | Fixed in working tree |
| CWE-79 | XSS | Open |
