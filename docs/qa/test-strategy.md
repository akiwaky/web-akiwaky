# QA Test Strategy

## Overview
Because the backend logic is completely separated from the git repository (living inside n8n), traditional `jest` unit testing only covers 50% of the application. The QA strategy must combine static UI validation with end-to-end (E2E) webhook validation.

## 1. Static UI Validation (Next.js)
- **Framework:** `vitest` + React Testing Library.
- **Scope:** Ensure `src/components/` render correctly. Since the components are mostly stateless presentation layers pulling from `src/config/`, tests should verify that the correct config values (like phone numbers and URLs) inject properly.
- **Command:** `npm run test`

## 2. End-to-End Visual testing (Playwright)
- **Framework:** `playwright`.
- **Scope:** Verify that the primary conversion flows render completely and button clicks operate.
- **Example Scenario:** "User navigates to `/chaty`, clicks the WhatsApp button for an assistant, verifies the `href` matches `wa.me/XXXXXXXXX?text=...` with the right hashtag pre-filled."

## 3. Webhook Integration Testing
- **Scope:** We must test that changes to the Next.js payload structure don't break the n8n receiving nodes.
- **Methodology (Manual):** Before merging a UI form change, the developer must submit dummy data to the production webhook and manually verify the n8n execution history tab for an `HTTP 200` and successful Notion insert.
- **Methodology (Automated - Future):** Use Playwright to intercept the `fetch` call locally and assert the payload structure strictly matches a JSON schema contract.

## 4. n8n Isolated Testing
- **Testing Logic:** Inside n8n, duplicate the production workflow you are editing and append `"-dev"` to the webhook URL (e.g., `/webhook/chaty-router-dev`). Test logic changes on the `-dev` endpoint using Postman or cURL before replacing the production workflow nodes.
