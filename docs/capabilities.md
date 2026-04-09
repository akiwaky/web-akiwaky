# System Capabilities

This document catalogs the specific capabilities of the web ecosystem, broken down by subsite.

## Portfolio & Central Identity (`/`)
*Status: MVP / In Development*
- **Capability:** Central hub routing traffic to specialized subsites.
- **Capability:** Presentation of the Alejandro AG professional identity.

## Piano Instruction Landing (`/music`)
*Status: Live*
- **Capability:** High-end, luxury aesthetic landing page for piano lessons.
- **Capability:** Config-driven pricing anchor display (`src/config/music.ts`).
- **Capability:** Primary Conversion: Direct-to-WhatsApp click-to-chat with pre-filled context.
- **Capability:** Secondary Conversion: Fallback lead capture form submitting to n8n webhook (`webhooks.ts`).

## Pal Norte Buddy Bot (`/norte`)
*Status: Live (Seasonal)*
- **Capability:** Ultra-low bandwidth, asset-free landing page designed for congested cellular networks.
- **Capability:** Click-to-WhatsApp onboarding.
- **Capability:** Conversational UI via WhatsApp parsing specific commands (`help`, `benefits`, `status`, `lost`).
- **Capability:** Notion-backed retrieval of festival schedules and VIP area metadata.

## Aki-Chaty CDMX Guide (`/chaty`)
*Status: Live*
- **Capability:** Landing page explaining the value proposition of a WhatsApp-first city guide.
- **Capability:** Natural language processing over WhatsApp to recommend CDMX coffee shops, restaurants, and bars.
- **Capability:** Notion-backed knowledge base retrieval (CMS).
- **Capability:** Unrecognized location logging (writes missed queries to Notion for future curation).

## Daily Briefing (`/daily`)
*Status: Live (Private)*
- **Capability:** Aggregation of personal daily metrics (Weather, LigaMX, NFL, NBA, Reddit).
- **Capability:** n8n-generated HTML payload delivered directly to the Next.js frontend on request.
- **Capability:** "Continue On Fail" resiliency (if one API goes down, the rest of the briefing still compiles).
