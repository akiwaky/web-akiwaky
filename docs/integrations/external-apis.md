# External APIs (3rd Party Services)

This document lists the minor third-party APIs consumed by the backend n8n engine, primarily utilized for the Daily Briefing generation.

## Supported Integrations

### 1. OpenWeatherMap
- **Purpose:** Fetches daily weather forecasts for CDMX.
- **Implementation:** Native HTTP Request node in n8n.
- **Key Params:** `lat`, `lon`, `appid` (API Key).

### 2. TheSportsDB
- **Purpose:** Fetches previous night scores and upcoming schedules for sports (LigaMX, NBA, NFL).
- **Implementation:** Native HTTP Request node in n8n returning unauthenticated JSON endpoints.

### 3. OpenAI (LLM)
- **Purpose:** NLP processing for WhatsApp conversational interfaces (Chaty) and summarizing dense APIs.
- **Implementation:** Native n8n OpenAI integration node, tied directly to the `gpt-4o-mini` default model for low-latency text tasks.

### 4. Telegram Bot API
- **Purpose:** Real-time push notifications to the administrator for new high-ticket leads.
- **Implementation:** Native n8n Telegram integration. Messages are routed specifically to Chat IDs bypassing groups.

## Resiliency Rule
External APIs (except OpenAI/Notion) are considered "non-critical". If TheSportsDB or OpenWeatherMap goes down, the orchestrator (n8n) must catch the HTTP error natively and pass a dummy string `"Unavailable"` to the final output generation so the rest of the application or daily briefing does not crash. This is handled by setting "Continue On Fail" in the n8n HTTP Request node settings.
