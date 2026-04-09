## 5. Automation Logic (n8n)
To implement backend logic, do not create custom Node.js services unless explicitly required.

Preferred order:
1. Modify an existing n8n workflow
2. Create a new n8n workflow
3. Produce import-ready JSON only when bindings are known

If MCP or API access is available, agents may:
- inspect workflows
- duplicate workflows into dev variants
- modify node configuration
- run tests
- export workflow backups

When bindings are unknown, fall back to a Build Package or a clearly scoped import package with assumptions.