# Architectural Boundaries

This document defines the strict separation of the local Next.js instance vs headless n8n logic.

## Front-End (Next.js)
The frontend is responsible solely for rendering UI, styling, static site generation, and capturing basic user intent (forms, clicks). It does **not** handle complex business logic, analytics routing, or database connections. Lead capture and user interactions are forwarded to the headless backend via webhooks.

## Back-End (n8n + Notion)
The backend is a purely detached, headless automation layer powered by n8n.
- **n8n**: Acts as the microservices router and execution engine.
- **Notion**: Acts as the headless CMS and remote database. Data is pulled via Notion API during workflow execution.

## Component Use Cases

### 1. Main Landing Portfolio (`/`)
Serves as the central portfolio and entry point for the Alejandro AG identity.

### 2. Music Landing Page (`/music`)
Specifically engineered as a conversion-first MVP (Minimum Viable Product).
- **Conversion Paths**: Primary is WhatsApp Click-to-Chat. Secondary is Fallback Lead Form.
- **Form Handling**: Submits via `fetch` to an n8n webhook.
- **Logic**: Decoupled configuration in `src/config/music.ts` allows updates to pricing, WhatsApp numbers, etc.

### 3. WhatsApp AI Hub (`/chaty`)
A multi-assistant WhatsApp gateway powered by the **MyWAtest** n8n workflow (ID: `Qx5heVRqQ0n2aAxU`).
- **Landing Page (`/chaty`)**: Dark-themed hub showcasing three hashtag-routed assistants on one WhatsApp number.
- **Assistants**:
  - **Aki-Chaty** (default) — CDMX place guide, curated KB via Notion.
  - **#Minerva** — Music admin assistant (lesson scheduling, student inquiries).
  - **#Norte / CompaBot** — Pal Norte festival companion (meetups, VIP benefits, lost & found).
- **Architecture**: All routing, intent classification, and KB queries are handled server-side by n8n. The frontend is a pure landing page with WhatsApp deep links — no fetch calls.
