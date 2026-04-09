# Integration: Notion

## Overview
Notion acts as the unified, serverless database for the entire ecosystem. It stores CRM data, festival metadata, city recommendations, and debug logs.

## Authentication
The system uses the official **Notion API** via the n8n Native Notion Node.
- Connections are authenticated via an integration token stored as an n8n Credential.
- **IMPORTANT:** Notion limits integrations to pages/databases they are explicitly "invited" to. If the n8n token receives a 404 on a valid Database ID, the n8n bot needs to be invited to that specific Notion page via the 3-dot menu.

## Query Strategies
- **Exact Match:** Whenever possible, use Notion's native filter API to sort and query items exactly by field.
- **Full Dump + Filter:** For databases under 50 items (like Pal Norte VIP benefits), fetch the entire database in one API call and use the n8n "Filter/Code" nodes to find the right item. This reduces sequential API calls to Notion.

## Schema Map (Primary Databases)
- **CRM (Music):** `Name (Title)`, `Email (Email)`, `Goal (Select)`, `Date Added (Created Time)`.
- **Places (Chaty):** `Name (Title)`, `Type (Multi-select)`, `Neighborhood (Select)`, `Price (Select)`, `Notes (Text)`.
- **Unanswered (Chaty):** `Query (Title)`, `User_WaId (Text)`.

## Rate Limits
Notion API is famously slow and rate-limited compared to SQL databases. Expect 3 requests per second on average. **Never query Notion directly from Next.js inside a loop.**
