---
description: Run the full QA pass (Smoke and Unit tests) over the current codebase securely.
---
# Run QA Pass Workflow

1. Install testing dependencies if missing (Vitest, Playwright browsers):
```bash
npm install
npx playwright install chromium
```
// turbo
2. Run standard pure unit tests for business configurations:
```bash
npm run test:unit
```
// turbo
3. Run end-to-end smoke verification tests against the local build to verify HTTP 200 success without breaking the local layout:
```bash
npm run test:e2e
```
4. Analyze the generated Playwright report (if errors) in `playwright-report/index.html`.
