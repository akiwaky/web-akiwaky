# akiwaky.cloud

Personal homepage of Alejandro AG — engineer, automator, melómano, photographer, builder of useful little machines.

Single-page Next.js site, statically exported, deployed via Cloudflare.

## Stack

- **Next.js 16** (App Router, `output: "export"` → static HTML)
- **React 19** + **TypeScript**
- Pure CSS (no Tailwind, no UI library) — the design lives entirely in `src/app/globals.css`
- Google Fonts: Instrument Serif, JetBrains Mono, Geist

No backend, no API routes, no external runtime dependencies.

## Develop

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint
npm run build     # static export to ./out
```

`npm run build` writes the deployable site to `out/`. Upload that folder (or point Cloudflare Pages at the repo).

## Layout

```
src/app/
  layout.tsx          # html shell, font links, metadata
  page.tsx            # the homepage (all 7 sections + footer)
  client-scripts.tsx  # 'use client' — language switch + smooth scroll
  globals.css         # the entire design (palette, sections, components)
  robots.ts
  sitemap.ts
```

## Design source

The homepage is implemented from the Anthropic design file `Personal Homepage.html` (zip drop at `C:\Code_repo\Personal Page.zip` on the author's machine). The "Tweaks" panel from the design preview (accent picker, headline serif/sans toggle) is **not** ported — those are design-tool affordances, not site features.

## License

Personal site. Code MIT, content all rights reserved.
