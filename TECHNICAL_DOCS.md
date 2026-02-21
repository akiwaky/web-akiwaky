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
- **Color Palette**: Minimalist charcoal (#111111) text on warm off-white backgrounds, with gold/accent highlights for CTA elements.
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

### 5.3 Static Site Generation (SSG)
All pages utilize Next.js Static Generation where possible to ensure near-instant load times and optimized SEO performance.

## 6. Asset Management
Local images are stored in `public/assets/img/`.
- `hero-portrait.png`: Professional portrait for teacher bio.
- `hands-on-keys.png`: Contextual landing image.
- `piano-strings.png`: Decorative background texture.
- `piano-keys-geo.png`: Geometric decorative element.

---
*Created on 2026-02-21* 
