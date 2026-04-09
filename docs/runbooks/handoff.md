# Runbook: Project Handoff & Onboarding

If you are a new developer or external contractor taking over this project, this is your map.

## 1. System Philosophy
This isn't a standard full-stack monolithic app. We use **declarative UI (Next.js)** paired with **visual backend microservices (n8n)**.
Do **not** build new API routes in Next.js (`/pages/api` or `/app/api`). If you need backend logic, build an n8n webhook workflow and `fetch` it from the client components.

## 2. Where is everything?
- **UI & Styling:** `src/app/` and `src/components/`. We use Tailwind.
- **Business Logic & Constants:** `src/config/`. If a client asks to change the phone number or price on a subsite, do not hunt through React components. Change the constants here.
- **Backend / Database:** You will need access to `n8n.akiwaky.cloud` and the master Notion workspace. Ask Alejandro for the Cloudflare Access permissions.

## 3. How do I test changes?
Because the UI is static and webhooks point to production endpoints, you don't even need to mock a database locally.
Simply run `npm run dev` and your local UI clicks will trigger real production webhooks via CORS. (Make sure you delete test leads from Notion afterward).

## 4. Required Reading List
Before pushing your first commit, read these documents in order:
1. `docs/overview.md`
2. `docs/architecture.md`
3. `docs/decisions/ADR-001-initial-architecture.md`
4. `docs/integrations/automation.md`
