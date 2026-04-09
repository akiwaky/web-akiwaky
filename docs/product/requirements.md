# Product Requirements Document (PRD)

## 1. Executive Summary
The Alejandro AG Web Ecosystem provides an instant-loading, beautifully designed central hub (`akiwaky.cloud`) that branches into highly specialized, headless interaction nodes. The ultimate goal is to generate leads (business) and automate utilities (personal) without maintaining traditional backend/database constraints.

## 2. Business Requirements
- **Maintenance Free:** The system must not require database migrations, ORM updates, or custom backend server patching.
- **Conversion Optimized:** Each subsite (`/music`) must load visibly in under 500ms and drive the user to a singular call-to-action (WhatsApp or a minimal web form).
- **Scale to Zero:** The infrastructure must be extremely cheap to run. Vercel free tier + small VPS.

## 3. Core Functional Requirements
### 3.1. Front-End (Next.js)
- Must be fully static or ISR (Incremental Static Regeneration).
- Must utilize Tailwind CSS for utility-first styling.
- Config-driven pages (pulling from `src/config/*.ts` maps).

### 3.2. Back-End (n8n Webhooks)
- Catch all POST requests from the Next.js `.tsx` components.
- Process incoming lead data.
- Trigger follow-up API calls (e.g., Telegram alerts, Notion inserts).

### 3.3. Conversational Architecture (WhatsApp)
- Handle deep-linked onboarding (`wa.me` links with pre-filled intents).
- Parse natural language input via n8n integration with OpenAI.
- Formulate personalized responses pulling specifically from Notion CMS entries.

## 4. Non-Functional Requirements (NFRs)
- **Security:** Do not expose Notion API keys or WhatsApp Cloud API tokens in the Vercel branch. They must remain exclusively inside n8n.
- **Performance:** 100/100 Lighthouse score on Mobile for the main landing endpoints.
- **Reliability:** The Daily Briefing workflow must survive partial API failures (e.g., if Weather API is down, sports data still renders).
