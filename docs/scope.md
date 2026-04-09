# System Scope

This document defines the strict boundaries of the Alejandro AG Web Ecosystem. It explicitly states what is **In Scope** for development and what is **Out of Scope** (anti-goals).

## 🟢 In Scope

### Frontend Application
- High-end, minimalist static landing pages (Next.js).
- Mobile-first, responsive design tailored for immediate conversion.
- Webhook-based lead capture forms as fallback mechanisms.
- Dynamic route configuration via local `.ts` files (`src/config/`).

### Backend Automation
- n8n serving as the exclusive backend HTTP request router and logic engine.
- Webhook endpoints to handle incoming leads from the frontend.
- API aggregation for personal utility (e.g., Daily Briefing pulling from OpenWeatherMap, TheSportsDB, Reddit).
- WhatsApp Business API integrations for conversational paths (`/norte`, `/chaty`).

### Data & CMS
- Notion as the exclusive database for structured data (e.g., CDMX places, Pal Norte schedules).
- Notion as the CMS for retrieving dynamic content during workflow execution.

### Security
- Cloudflare Zero Trust protecting administrative interfaces (n8n).
- Webhook endpoints exposed publicly but restricted by CORS when applicable.

---

## 🔴 Out of Scope (Anti-Goals)

The following architectures or features are explicitly rejected to maintain the lightweight, headless philosophy of the system:

1. **Traditional Backend Services**
   - No custom Express/FastAPI/Django servers will be built. *All business logic lives in n8n.*
2. **Traditional Relational Databases**
   - No PostgreSQL, MySQL, or MongoDB instances will be provisioned or maintained. *Notion acts as the sole data store.*
3. **Heavy Client-Side State**
   - No complex state management (Redux, Zustand) in the frontend. *The frontend is stateless presentation; state lives in Notion/n8n.*
4. **User Authentication (B2C)**
   - No user login, registration, or JWT handling in the frontend application. *Users are anonymous; identity is tied to their WhatsApp number in the backend.*
5. **Real-time WebSockets**
   - Interactions are synchronous webhook fired-and-forgotten, or asynchronous WhatsApp messages. *No live WebSocket connections are maintained.*
