# Home Automation Editor

An IDE-style web editor for designing and simulating smart-home setups. Lay out a floor plan, drop in devices (lights, thermostats, locks, cameras, speakers, TVs), and run a simulation to preview how your home automation behaves — all in a slick dark UI with resizable panels.

Originally generated with [v0.app](https://v0.app), now maintained as a standalone open-source project.

## Features

- **IDE-style layout** — collapsible left, right, and bottom panels with resizable splits
- **Floor-plan canvas** — zoom, pan, and rotate the plan; select and position devices
- **Device palette** — lights, thermostats, locks, cameras, speakers, TVs (Lucide icons)
- **Simulation mode** — play button toggles a simulated "running" state
- **Searchable device library** — filter devices from the palette
- **Dark/light mode** — theme toggle built in
- **Editor chrome** — undo/redo, save, tabs, settings, help, docs panels
- **Static export ready** — builds to plain static files, deployable anywhere

## Tech Stack

- [Next.js](https://nextjs.org) 15 (App Router, `output: 'export'` static export)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix primitives)
- [Framer Motion](https://motion.dev) — animations
- [Lucide](https://lucide.dev) icons
- No backend, no database, no API routes — fully client-side demo UI

## Quick Start

```bash
# install dependencies
npm install
# or: pnpm install

# run the dev server
npm run dev
# open http://localhost:3000

# build a static export (writes to ./out)
npm run build
```

## Project Structure

```
app/
  page.tsx            # main editor: panels, floor plan, device palette
  layout.tsx          # root layout, theme provider
  loading.tsx         # loading state
  globals.css         # Tailwind + custom styles
components/
  theme-provider.tsx
  ui/                 # shadcn/ui primitives (resizable, tabs, scroll-area, ...)
lib/
  utils.ts            # cn() helper
public/               # static assets
```

## Environment Variables

None — the app is a fully client-side demo and needs no configuration.

## Deployment

- **GitHub Pages** (current): the site is statically exported (`output: 'export'` in `next.config.mjs`) and served from the `gh-pages` branch. Because GitHub Pages serves project sites from a subpath (`/<repo>/`), `next.config.mjs` sets `basePath: '/home-automation-platform'`. **Remove `basePath` when deploying to a root domain or Vercel.**
- **Vercel**: import the repo, `npm run build` works out of the box (remove `basePath` first).
- **Any static host**: serve the `./out` directory after `npm run build`.

Live demo: https://girishlade111.github.io/home-automation-platform/

## Security Note

Next.js is pinned to **15.2.8**, which includes patches for CVE-2025-55182 (React2Shell RCE) and related advisories affecting older 15.2.x releases. Keep it updated.

---

Built by Girish Lade — [ladestack.in](https://ladestack.in)
