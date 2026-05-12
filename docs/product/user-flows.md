# User Journeys & Flows

## Core Flow: Automated Curation (`/chaty`)

1. **Discovery:** User scans a QR code at an event or clicks a link.
2. **Onboarding:** User lands in WhatsApp: `Hi Chaty! I need a coffee shop recommendation in Polanco.`
3. **Execution Pipeline:**
   - WhatsApp posts the message to the n8n webhook.
   - n8n calls OpenAI: "Extract context: Location=Polanco, Type=Coffee Shop."
   - n8n searches the Notion Places Database for matches.
   - n8n formats the result in a friendly tone using OpenAI and fires the WhatsApp Reply API.
4. **Exception Handling:** If no matches are found, n8n writes the "missed query" to a Notion "Wishlist" database so admins can add the venue later, and replies: "I don't know any spots there yet, but I'll add it to my scouting list!"
