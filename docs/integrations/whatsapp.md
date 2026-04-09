# Integration: WhatsApp Business API

## Overview
The ecosystem uses the **Meta WhatsApp Cloud API**. All chat products (`/norte`, `/chaty`) are funneled through the same exact phone number but are routed by n8n based on content or user state.

## Webhook Architecture
- **Provider:** Meta Developers (Cloud API).
- **Endpoint:** Meta routes all incoming messages to a single n8n Webhook: `https://webhooks.akiwaky.cloud/webhook/whatsapp`.
- **Validation:** Meta requires a specific static webhook verification token which is managed inside the n8n webhook node settings.

## Data Payload Structure
When a user sends a message, n8n receives a JSON array in the `entry` wrapper. The core logic extracts the exact `text.body` and the user's `wa_id` (phone number).

Unlike generic web forms, WhatsApp integrations maintain persistent "pseudo-sessions" based on the user's phone number as the primary key.

## Best Practices
1. **24-Hour Rule:** Meta only allows free-form text messages within 24 hours of the *user's last message*. After 24 hours, only pre-approved template messages can be sent. We generally avoid templates and only reply to user-initiated messages to keep things simple and free.
2. **Read Receipts:** Always fire a standard WhatsApp node action "Mark as Read" immediately upon n8n receiving the payload so the user's double-blue tick triggers.
3. **Typing Indicators:** For LLM workflows that take >2 seconds, fire a WhatsApp node action "Typing..." to keep the user engaged.
