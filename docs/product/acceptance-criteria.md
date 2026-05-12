# Acceptance Criteria & Definitions of Done

## Epic: Conversational AI (`/chaty`)
- [ ] **Story:** As a user, I want natural, conversational responses.
  - **AC:** The n8n workflow must complete the entire WhatsApp -> Notion -> OpenAI -> WhatsApp loop in under 5 seconds.
  - **AC:** Responses must explicitly cite the venues existing in the Notion database, rejecting hallucinations.
- [ ] **Story:** As a curator, I want to know what my users are searching for that I lack.
  - **AC:** Any query that yields a 0-result search in Notion must append the user's raw prompt string to the "Unanswered Logs" database automatically.

## Definition of Done (DoD)
For any feature to be considered "Done" traversing this repository:
1. Feature works locally (`npm run dev`).
2. Code is merged to `main` with 0 ESLint errors.
3. n8n workflow changes (if any) are exported as JSON backups if they are critical configuration updates.
4. Vercel branch successfully builds and deploys to `akiwaky.cloud`.
