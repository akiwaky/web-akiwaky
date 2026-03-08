# AI Agents Guidelines and Rules 

This repository relies on `.agent/skills/` and `.antigravity/` workflows to assist with development, automation, and marketing. Agents operating in this codebase MUST follow these project-level rules carefully to maintain strict architectures and prevent exposing secrets.

## Project Directory & Architectural Boundaries
1. **Never commit secrets:** Double-check `.gitignore` before creating automation scripts. Pay special attention to protecting `N8N_API_KEY` and Cloudflare bypass tokens. Do not commit `.mcp.json` or scripts containing these secrets.
2. **Isolate external calls:** Do not put `fetch` logic directly in UI React components. All external API calls and logic must be isolated in `src/integrations/` wrappers.
3. **Write tests alongside config changes:** `src/config/music.ts` (and similar config files) dictates core business logic (e.g., pricing, WhatsApp numbers). Whenever modifying them, update corresponding tests immediately to prevent lead capture failures or silent regressions.
4. **Follow the Architectural Boundaries:** 
   - Pure UI components go in `src/components/`.
   - Business data variables and environment configurations go in `src/config/`.
   - Mock data goes in `src/data/`.
   - Integration wrappers and API functions go in `src/integrations/`.
   - Pure developer operations and deployment scripts go in `tools/scripts/` or `tools/validation/`.
5. **Prefer Native n8n Nodes over Generic:** Be aware of the best nodes to use when building n8n workflows. Always prefer "native" node solutions over custom webhooks, custom code nodes, or other methods. Attempt the most common native solution first to minimize fragmentation.

## Safe-First Principle
1. Never move code directories without running `npm run lint` and `npm run build` locally to confirm structural integrity, unless instructed to do so specifically in a cleanup phase.
2. Update all imports immediately when extracting or moving files (use IDE or regex safely).
3. Do not alter `src/config/` logic natively for ad-hoc UI needs; only move caller boundaries.
4. Do not delete scripts running background processes (e.g. `npx supergateway`) until alternative validation is tested and confirmed.
5. Verify everything is working and changes are committed safely after completion. Always make sure the git online repo contains the most up-to-date source files and ABSOLUTELY NO sensitive information.

## Available AI Skills
This repository incorporates specialized AI agent skills located in `.agent/skills/`:

### Development & Workflows
- **Agents**: `backend-agent`, `frontend-agent`, `mobile-agent`, `qa-agent`, `pm-agent`
- **Workflows & Infra**: `commit`, `debug-agent`, `developer-workflow`, `multi-agent-workflow`, `orchestrator`, `terraform-infra-engineer`

### n8n Automation Mastery
- **Node & Config**: `n8n-node-configuration`, `n8n-expression-syntax`, `n8n-mcp-tools-expert`
- **Logic & Patterns**: `n8n-workflow-patterns`, `n8n-validation-expert`, `n8n-code-javascript`, `n8n-code-python`

### Marketing, CRO & Strategy
- **Copy & Content**: `copywriting`, `copy-editing`, `content-strategy`, `social-content`, `email-sequence`, `cold-email`, `ad-creative`
- **CRO & UX**: `page-cro`, `form-cro`, `popup-cro`, `onboarding-cro`, `signup-flow-cro`, `paywall-upgrade-cro`, `ab-test-setup`
- **Search & Structure**: `seo-audit`, `ai-seo`, `schema-markup`, `programmatic-seo`, `site-architecture`
- **Strategy & Growth**: `marketing-ideas`, `marketing-psychology`, `product-marketing-context`, `free-tool-strategy`, `launch-strategy`, `pricing-strategy`, `competitor-alternatives`, `sales-enablement`, `referral-program`, `revops`, `analytics-tracking`, `paid-ads`, `churn-prevention`
