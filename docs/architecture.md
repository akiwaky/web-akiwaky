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

### 3. Pal Norte WhatsApp Bot (`/norte`)
Engineered as a lightweight, low-bandwidth text companion for the Pal Norte music festival, connected directly to WhatsApp via n8n and Notion.
- **Landing Page (`/norte`)**: A pure text-first, mobile-first design leveraging `src/config/norte.ts`. Built with maximum contrast and zero heavy assets for fast loading on congested cell towers.
- **n8n Workflow Architecture**: Powered by a 7-node microservice architecture on n8n.
- **Notion Knowledge Base**: Stores `Event_metadata`, `VIP Benefits`, `group_status`, and `Users`.

### 4. General Chat-Bots
Any general-purpose conversational logic is handled through n8n HTTP Request nodes bridging to OpenAI/Anthropic APIs, with context retrieved from Notion. The UI provides only the interface layer.
