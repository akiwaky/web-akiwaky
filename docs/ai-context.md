# AI Context Document

This document defines the machine-readable system logic designed explicitly to help autonomous AI agents (like PM, Frontend, Backend agents) navigate the repository without requiring constant user intervention.

## 1. Directory Abstraction Rules
AI agents must strictly follow these structural rules:

| Content Type | Permitted Location | Restriction |
|---|---|---|
| AI Workflows / Prompts | `.antigravity/workflows`, `.agent/skills/` | Do not place these in `src/` |
| Business Config | `src/config/*.ts` (e.g., `music.ts`) | Do not hardcode UX copy in React components |
| API Orchestration | `src/integrations/n8n/webhooks.ts` | Do not place `fetch()` inside `.tsx` components |
| UI Components | `src/components/`, `src/app/` | UI must be strictly presentation |
| Sensitive Files | `/tmp`, `.gitignored` files | NEVER commit secrets or token dumps |

## 2. Headless Configuration Model
This repository uses a pattern where specialized subsites look up their logic in purely typed configuration objects instead of databases.
If an agent needs to change the phone number for the Pal Norte bot, they must *only* edit `src/config/norte.ts`. If they need to change the pricing data for the music landing page, they *only* edit `src/config/music.ts`.

## 3. Notion Schema Awareness
Notion acts as the real database. Since Notion IDs are hardcoded in the application (like `chaty.ts`), agents must treat these IDs like connection strings.
- **Do not modify Notion DB IDs in source code** without explicit instruction.
- **Do not assume Notion schema structure**; always ask the user or look up schemas via n8n configurations first.

## 4. Webhook Integrity
All webhooks triggered by the Next.js frontend are sent to `webhooks.akiwaky.cloud` (the n8n API gateway).
Agents modifying `webhooks.ts` must ensure that the payload schemas match what the corresponding n8n workflows expect.

## 5. Automation Logic (n8n)
To build logic features (like sending an email or processing an order), **do not generate Node.js backend code**. Generating backend servers is an anti-pattern in this ecosystem. Instead, the agent must generate or propose an `n8n` workflow JSON and instruct the user how to import it.
