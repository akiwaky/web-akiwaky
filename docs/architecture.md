# Architectural Boundaries & Flow

This document defines the strict separation of the local Next.js frontend, headless n8n logic, and headless CMS execution.

## Core System Diagram

```mermaid
flowchart TD
    Client[Web Client / User] -->|HTTPS| Frontend(Next.js on Vercel)
    Frontend -->|POST Webhooks| Cloudflare[Cloudflare Security Edge]
    Cloudflare -->|HTTPS Tunnel| n8n([n8n Worker Subnet])
    
    WhatsApp[User on WhatsApp] -->|Cloud API| Cloudflare
    
    n8n -->|API Requests| Notion[(Notion Headless CMS)]
    n8n -->|API Requests| OpenAI[OpenAI / Anthropic Models]
    n8n -->|External APIs| OpenWeatherMap[Weather / Sports]
```

## Boundary Definitions

### 1. Front-End (Next.js)
The frontend is responsible solely for rendering UI, styling, static site generation, and capturing basic user intent (forms, clicks). It does **not** handle:
- Complex business logic or validation
- Analytics routing
- Direct database connections (No SQL/Prisma here)
- Any state management beyond simple React hooks

*Lead capture and user interactions are forwarded to the headless backend via webhooks.*

### 2. Back-End (n8n + Notion)
The backend is a purely detached, headless automation layer powered by n8n.
- **n8n**: Acts as the microservices router, execution engine, and API Gateway.
- **Notion**: Acts as the headless CMS and remote database. Data is pulled via Notion API during workflow execution, keeping the website perfectly static but dynamic via API.

## Subsite Architectures & Data Flows

### A. Music Landing Page (`/music`)
Specifically engineered as a conversion-first MVP (Minimum Viable Product).
- **Data Flow:** User views page → Config loaded statically from `src/config/music.ts` → User clicks "Book Class" or fills form → `fetch` triggers `submitMusicLead()` in `webhooks.ts` → n8n webhook receives POST payload.

### B. Pal Norte WhatsApp Bot (`/norte`)
Engineered as a lightweight, low-bandwidth text companion connected directly to WhatsApp via n8n and Notion.
- **Data Flow:** Landing Page (`/norte`) loads config from `src/config/norte.ts`. User clicks WhatsApp link. All further interaction is handled via WhatsApp → n8n Webhook → Notion Read (for event metadata) → WhatsApp response.

### C. Aki-Chaty CDMX Guide (`/chaty`)
A headless recommendation engine for CDMX, designed completely around WhatsApp interaction.
- **Data Flow:** Landing page loads `src/config/chaty.ts`. WhatsApp message triggers n8n → n8n queries Notion Places DB (ID `31cf1ccf-f3d3-8191-9b49-c03faa9864dc`) → LLM formats response based on context → n8n returns WhatsApp message.

### D. Daily Briefing (`/daily`)
An internal aggregation tool.
- **Data Flow:** Client requests `/daily` → `getDailyBriefing()` GETs the n8n webhook → n8n executes workflow (fetches weather, sports) → returns pure HTML payload to Next.js → Next.js dangerously sets HTML for user view.
