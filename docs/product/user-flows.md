# User Journeys & Flows

## Core Flow 1: High-Ticket Lead Acquisition (`/music`)

1. **Discovery:** User clicks an Instagram Ad or local SEO result and lands on `akiwaky.cloud/music`.
2. **Engagement:** User scrolls the single-page, high-contrast, text-heavy editorial landing page.
3. **Decision Point:**
   - *Path A (Primary):* User clicks "Book introductory class". They are redirected to WhatsApp with a pre-filled message: `"Hi Alejandro, I'm interested in piano lessons. My level is [beginner/advanced]."`.
   - *Path B (Secondary):* User scrolls to the footer and fills out the inline HTML lead form `[Name, Email, Goal]`.
4. **Automation Execution (Path B):**
   - Next.js fires `fetch` to `webhooks.akiwaky.cloud/webhook/music-lead`.
   - n8n receives the payload, inserts a new row into the CRM (Notion), and sends an immediate push notification to Alejandro's phone via Telegram.
5. **Fulfillment:** Alejandro replies manually to the lead via WhatsApp.

---

## Core Flow 2: Automated Curation (`/chaty`)

1. **Discovery:** User scans a QR code at an event or clicks a link.
2. **Onboarding:** User lands in WhatsApp: `Hi Chaty! I need a coffee shop recommendation in Polanco.`
3. **Execution Pipeline:**
   - WhatsApp posts the message to the n8n webhook.
   - n8n calls OpenAI: "Extract context: Location=Polanco, Type=Coffee Shop."
   - n8n searches the Notion Places Database for matches.
   - n8n formats the result in a friendly tone using OpenAI and fires the WhatsApp Reply API.
4. **Exception Handling:** If no matches are found, n8n writes the "missed query" to a Notion "Wishlist" database so admins can add the venue later, and replies: "I don't know any spots there yet, but I'll add it to my scouting list!"
