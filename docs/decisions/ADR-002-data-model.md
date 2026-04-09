# ADR 002: Headless CMS and Database Strategy

**Status:** Accepted
**Date:** 2024-03-08

## Context
Various subsites require dynamic data storage:
- `/chaty` needs a database of CDMX places and missing query logs.
- `/norte` needs festival schedules and dynamic VIP benefit lists.
Setting up PostgreSQL or MongoDB would require infrastructure overhead, ORM maintenance, and custom admin dashboards for non-technical users to update content.

## Decision
We chose **Notion** as the exclusive relational database and headless CMS for the entire ecosystem.

## Consequences
- **Positive:** Instant, beautiful, out-of-the-box admin UI for content management.
- **Positive:** Easy relational mapping (e.g., linking a 'Place' to a 'Category').
- **Negative:** The Notion API can be slow (sometimes >1s response times) and has strict rate limits.
- **Mitigation:** We restrict direct Next.js-to-Notion calls. Notion is *only* queried asynchronously by n8n during background executions or conversational workflows (like WhatsApp) where a 1-2 second latency is acceptable to the user.
