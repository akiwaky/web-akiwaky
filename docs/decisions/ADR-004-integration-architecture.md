# ADR 004: Integration Architecture & Conversational UI

**Status:** Accepted
**Date:** 2024-03-08

## Context
Several products within the ecosystem (`/norte`, `/chaty`) are entirely conversational. Traditional web apps would require building chat UIs, WebSocket connections for real-time delivery, and persistent message stores in a database.

## Decision
We leverage **WhatsApp** as the primary interactive UI for users, routing messages through n8n via the official WhatsApp Business Cloud API.
- Users initiate sessions by clicking "Click-to-Chat" wa.me links on the landing pages.
- WhatsApp posts webhooks to n8n upon user messages.
- n8n processes the input, looks up data in Notion, queries an LLM if necessary, and replies via the WhatsApp API.

## Consequences
- **Positive:** Developers do not need to build, style, or maintain chat interfaces on the frontend.
- **Positive:** Incredibly high engagement and retention since users already use WhatsApp daily.
- **Negative:** Dependent on Meta's WhatsApp API policies, rate limits, and 24-hour service window restrictions.
- **Mitigation:** Fallback logic and default template messages must be defined in n8n for out-of-window contact.
