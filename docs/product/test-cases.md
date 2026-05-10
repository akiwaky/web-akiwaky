# Core Manual Test Cases

Before deploying major changes to the Vercel edge or n8n workflows, these functional paths must pass manually.

## TC-01: WhatsApp Deep Link Generation (`/chaty`)
**Prerequisites:** Mobile device (or web WhatsApp).
1. Navigate to `/chaty` on a mobile device.
2. Tap the primary "Chat on WhatsApp" CTA for any assistant.
**Expected Result:**
- Natively opens the WhatsApp application.
- The chat is directed to the correct phone number (defined in `src/config/chaty.ts`).
- The message input field is pre-filled with the context-specific URL-encoded string (including the assistant hashtag when applicable).

## TC-03: Chaty Recommendation Pipeline
**Prerequisites:** Active n8n `webhooks.akiwaky.cloud` running the Chaty flow.
1. Send WhatsApp message: `Hola, tienes alguna recomendación para un postre en la Roma Norte?`.
**Expected Result:**
- Receive the "typing" indicator or initial processing message (if defined).
- Within 10 seconds, receive a response recommending a dessert spot.
- The spot MUST exist in the Notion Places DB.
- The tone must be friendly and conversational (OpenAI parsing output correctly).

## TC-04: Daily Briefing Generation
**Prerequisites:** Active Daily Briefing workflow in n8n.
1. Open a browser or terminal and `curl https://webhooks.akiwaky.cloud/webhook/daily/status`.
**Expected Result:**
- Immediate response: `200 OK`.
- Payload is a valid, un-escaped HTML string containing today's date, weather, and active sports data.
- Does not contain `[Object object]` or template literal errors.
