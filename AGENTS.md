# AI Agents Guidelines and Rules 

This repository relies on `.agent/skills/` and `.antigravity/` workflows to assist with development, automation, and marketing. Agents operating in this codebase MUST follow these project-level rules carefully to maintain strict architectures and prevent exposing secrets.

## Project Directory & Architectural Boundaries
1. **Never commit secrets:** Double-check `.gitignore` before creating automation scripts. Pay special attention to protecting `N8N_API_KEY` and Cloudflare bypass tokens. Do not commit `.mcp.json` or scripts containing these secrets.
2. **Isolate external calls:** Do not put `fetch` logic directly in UI React components. All external API calls and logic must be isolated in `src/integrations/` wrappers.
3. **Write tests alongside config changes:** Files in `src/config/` dictate core business logic (e.g., WhatsApp numbers, Notion DB IDs). Whenever modifying them, update corresponding tests immediately to prevent silent regressions.
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

## n8n Workflow Collaboration Policy v2

### Primary objective
Optimize for:
- maintainability
- safe iteration
- accurate use of the real n8n environment
- minimal custom logic
- small, auditable changes

### Working modes
Use one of these modes explicitly:

1. Advisory mode
Use when workflow access is unavailable or bindings are unknown.
Deliver a Build Package with architecture, nodes, expressions, assumptions, and validation steps.

2. Builder mode
Use when MCP or API access is available.
Inspect the existing workflow first, prefer targeted edits, duplicate to a `-dev` workflow when risk is non-trivial, test there, then document final changes.

3. Debug mode
Use for broken or degraded workflows.
Diagnose first. Patch the smallest failing layer first:
- trigger/input normalization
- node configuration
- expressions
- branching
- retrieval/query step
- response formatting
- fallback/error handling

### Implementation hierarchy
Choose in this order:

1. Native node
2. Native node + expressions
3. HTTP Request node when no suitable native app node exists, or when debugging an external API directly
4. Code node for small transforms, formatting, normalization, or debug instrumentation
5. Verified community node only with explicit approval
6. External custom service only with explicit approval

### Allowed by default
- Inspect existing workflows through MCP/API before proposing rebuilds
- Produce targeted patch plans instead of full rewrites
- Use Test webhook URLs and manual executions during development
- Duplicate production workflows into `-dev` variants before risky changes
- Export critical workflows to git after meaningful updates
- Use Code nodes when the logic is short, local, and easier to audit than a large expression chain

### Disallowed by default
- Inventing credential IDs, workflow IDs, or resource bindings
- Building a custom app backend when n8n can satisfy the requirement
- Using unverified community nodes
- Using Execute Command or Local File Trigger
- Hiding major business logic inside long opaque code blocks
- Testing local UI changes against production webhooks unless explicitly required

### Delivery expectations
- For greenfield work: Build Package
- For existing workflows with access: Patch Plan
- For stable, environment-known workflows: Import JSON is allowed

Every n8n response should include:
1. Objective
2. Current state or issue
3. Exact nodes to create/change
4. Inputs or credentials still required
5. Test steps
6. Risks / assumptions
7. Anti-custom audit