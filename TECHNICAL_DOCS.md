# Technical Documentation: Alejandro AG Web Ecosystem

## 1. Overview
This repository contains the source code for Alejandro AG's personal website and specialized subsites (currently focusing on the Piano/Music teaching landing page). The project is designed with a minimalist, high-end editorial aesthetic, prioritizing mobile-first conversion and practical automation.

## 2. Tech Stack
- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI + Custom components
- **Utilities**: `clsx`, `tailwind-merge` (for dynamic class management)

## 3. Repository Structure
```text
src/
├── app/
│   ├── (main)/          # Principal site routes (Home, Hero, Story)
│   ├── (subsites)/      # Specialized landing pages
│   │   └── music/       # Piano/Music teaching MVP landing page
│   ├── layout.tsx       # Root layout
│   └── globals.css     # Global styles and design tokens
├── components/
│   ├── sections/        # Page-specific sections (Hero, Services, etc.)
│   └── ui/              # Reusable UI primitives (Buttons, Inputs, etc.)
├── config/
│   └── music.ts        # Centralized variables for the music landing page
├── lib/
│   └── utils.ts        # Helper functions (cn utility)
└── public/
    ├── assets/          # Processed images and icons
    └── Imported-assets/ # Raw visual assets provided by the user
```

## 4. Key Subsystems

### 4.1 Music Landing Page (`/music`)
Specifically engineered as a conversion-first MVP (Minimum Viable Product).
- **Conversion Paths**: 
  - Primary: WhatsApp Click-to-Chat buttons with pre-filled messages.
  - Secondary: Fallback Lead Form (React controlled component).
- **Logic**: Decoupled configuration in `src/config/music.ts` allows non-technical updates to pricing, WhatsApp numbers, and zone logic.
- **Form Handling**: Submits via `fetch` to an n8n webhook (configured in `MUSIC_CONFIG`). Includes a honeypot field for basic anti-spam.
- **New Routes**:
  - `/music`: Main landing.
  - `/music/politicas`: Payment and behavior policies.
  - `/music/aviso-privacidad`: Privacy notice.
  - `/music/gracias`: Form submission success page.

### 4.2 Design System
- **Color Palette (Luxury Dark Mode)**: 
  - Background/Text: Deep Onyx (#131515) background with Pastel Petal (#fecee9) foreground to establish a bespoke, luxurious feel.
  - Brand Colors: Plum (#eb9fef) as Primary, Verdigris (#339989) as Secondary.
  - Accents/UI: Champagne Gold (#D4AF37) for highlights, borders, and rings. Midnight Obsidian (#0a0b0b) for nested cards to add 3D depth.
- **Typography**: Optimized font hierarchy (Sans-serif for body/ui, Serif for quotes and editorial emphasizes).
- **Responsive Philosophy**: Mobile-first grid layouts with generous whitespace.

## 5. Development & Operations

### 5.1 Environment Configuration
The project uses a configuration-driven approach. Most business logic variables are stored in `src/config/music.ts`:
- `whatsappNumber`: E.164 formatted phone number.
- `regularPriceAnchor`: Base price displayed on cards.
- `n8nWebhookUrl`: Endpoint for the lead capture system.

### 5.2 Build & Deployment
- **Commands**:
  - `npm run dev`: Start local development server.
  - `npm run build`: Perform a production build (optimizes images, minifies code, generates static pages).
  - `npm run lint`: Run ESLint for code quality checks.

### 5.4 n8n Infrastructure
- **Server URL**: `https://n8n.akiwaky.cloud/`
- **Webhook Base URL**: `https://webhooks.akiwaky.cloud/`
- **Integration**: Model Context Protocol (MCP) server for live workflow interaction.
- **Security Notice**: Do NOT commit `.mcp.json` or `deploy_n8n.py` to the repository. These files contain sensitive `N8N_API_KEY` and `CF-Access-Client-Secret` headers required to bypass Cloudflare Zero Trust during local CLI automation. All such tools are securely configured in `~/.gemini/antigravity/mcp_config.json` outside of source control.

### 5.3 Static Site Generation (SSG)
All pages utilize Next.js Static Generation where possible to ensure near-instant load times and optimized SEO performance.

## 6. Asset Management
Local images are stored in `public/assets/img/`.
- `hero-portrait.png`: Professional portrait for teacher bio.
- `hands-on-keys.png`: Contextual landing image.
- `piano-strings.png`: Decorative background texture.
- `piano-keys-geo.png`: Geometric decorative element.

## 7. Available AI Skills
This repository incorporates specialized AI agent skills to accelerate development, automation, and marketing. These are located in `.agent/skills/`.

### 7.1 Development & Workflows
- **Agents**: `backend-agent`, `frontend-agent`, `mobile-agent`, `qa-agent`, `pm-agent`
- **Workflows & Infra**: `commit`, `debug-agent`, `developer-workflow`, `multi-agent-workflow`, `orchestrator`, `terraform-infra-engineer`

### 7.2 n8n Automation Mastery
- **Node & Config**: `n8n-node-configuration`, `n8n-expression-syntax`, `n8n-mcp-tools-expert`
- **Logic & Patterns**: `n8n-workflow-patterns`, `n8n-validation-expert`, `n8n-code-javascript`, `n8n-code-python`

### 7.3 Marketing, CRO & Strategy
- **Copy & Content**: `copywriting`, `copy-editing`, `content-strategy`, `social-content`, `email-sequence`, `cold-email`, `ad-creative`
- **CRO & UX**: `page-cro`, `form-cro`, `popup-cro`, `onboarding-cro`, `signup-flow-cro`, `paywall-upgrade-cro`, `ab-test-setup`
- **Search & Structure**: `seo-audit`, `ai-seo`, `schema-markup`, `programmatic-seo`, `site-architecture`
- **Strategy & Growth**: `marketing-ideas`, `marketing-psychology`, `product-marketing-context`, `free-tool-strategy`, `launch-strategy`, `pricing-strategy`, `competitor-alternatives`, `sales-enablement`, `referral-program`, `revops`, `analytics-tracking`, `paid-ads`, `churn-prevention`

---
*Created on 2026-02-21* 
*Last updated on 2026-03-02*
