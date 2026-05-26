# Claude Code — IDE guide for akiwaky.cloud

This is the v2 redesign of the site: a single-page static landing page. No subsites, no API integrations, no n8n calls from the frontend.

## Quick commands

```bash
npm run dev     # local dev server at http://localhost:3000
npm run build   # static export → ./out
npm run lint    # ESLint
```

## Where things live

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | The whole homepage. Seven sections + footer. |
| `src/app/globals.css` | All styling. Pure CSS with CSS custom properties. |
| `src/app/layout.tsx` | HTML shell, font preloads, site metadata. |
| `src/app/client-scripts.tsx` | The only `'use client'` file — language toggle + smooth-scroll anchors. |
| `src/app/robots.ts` / `sitemap.ts` | SEO basics. |

That's the entire deployable surface. If you find yourself adding more, stop and reconsider.

## Architectural rules

1. **Keep it static.** No `fetch()` from the page, no API routes, no env vars at runtime. The site builds to plain HTML/CSS/JS.
2. **No new dependencies without reason.** The point of v2 was to strip down — Tailwind, shadcn, Framer Motion, DOMPurify, vitest, playwright were all removed intentionally. Don't reintroduce a library to do something CSS can already do.
3. **Edit `globals.css` for visual changes.** The design system is a flat set of CSS custom properties at the top of that file. Change the variable, not 14 component files.
4. **Run `lint` + `build` before any structural change.** The static export catches more than the linter (e.g. unescaped quotes in JSX, missing client directives).
5. **Don't commit `.env*`, `.claude/`, `out/`, `-todelete/`.** All gitignored — keep it that way.

## What was removed (v2 redesign, 2026-05-25)

Everything from the v1 multi-subsite app: `/music`, `/chaty`, `/norte`, `/daily`, all of `src/components`, `src/config`, `src/integrations`, `src/data`, the Playwright/Vitest harness, the `tools/scripts/` PowerShell ops, all docs except this file. A snapshot of the pre-redesign repo is at `C:\Code_repo\repo_web_legacy\` (local, not in git).

The agent-skills bundle (`.agent/skills/`) was moved to `-todelete/skills/` for review — gitignored, not deployed.

## Deployment

Static export. `npm run build` writes `out/`. Cloudflare Pages or any static host.
