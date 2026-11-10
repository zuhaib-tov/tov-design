# TOV Design System

TOV Furniture's internal source of truth for website components and shared
imagery — structured like Material Design's docs site, scoped down to what an
ecommerce storefront actually needs.

Built with Next.js (App Router) + TypeScript + Tailwind CSS v4.

## What's in here

- **Foundations** (`/foundations/*`) — color, typography, spacing & radius.
  Values were sampled from tovfurniture.com's live computed styles, and the
  primary color has been cross-checked against the team's Figma file.
- **Components** (`/components/*`) — Button, Badge, Input/Select, Product
  Card, Price, Rating, Tabs, Accordion, Modal/Drawer, Breadcrumbs, Pagination.
  Each doc page has a live preview, a "show code" snippet, and a props table.
  The actual component source lives in `src/components/ui/`.
- **Asset Library** (`/assets`) — a shared imagery store: drag-and-drop
  upload, tagging/folders, bulk download as a zip, and a "Sync from Figma"
  action that pulls frames straight from a Figma file into the library.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Figma sync setup

The Asset Library's "Sync from Figma" feature calls Figma's REST API
directly (not through any Claude/MCP tooling), so it works for anyone who
opens the deployed app.

1. Copy `.env.local.example` to `.env.local`.
2. Generate a personal access token: figma.com → account settings →
   Personal access tokens.
3. Set `FIGMA_TOKEN=<your token>` in `.env.local`.
4. Restart the dev server.

## Where imagery is actually stored

`src/lib/asset-store.ts` writes uploaded/synced files to `storage/assets/`
on disk, with metadata in `storage/assets/index.json`. This works well for
local use or any host with a persistent disk (a small VPS, Docker + volume).

**It will not persist on Vercel's default serverless functions**, which have
an ephemeral filesystem — uploads would vanish on the next deploy or cold
start. If you deploy there, swap the file I/O in `asset-store.ts` for
[Vercel Blob](https://vercel.com/docs/storage/vercel-blob) or S3; every
route under `src/app/api/assets/` only calls the functions exported from
that one file, so it's a single-file change.

## Keeping this as the actual source of truth

- Colors/fonts/radii live in `src/app/globals.css` (Tailwind v4 `@theme`
  tokens) and `src/lib/tokens.ts` (the same values, for use in docs tables
  and JS). Update both together when the live site's styling changes.
- `--font-display` currently maps to Fraunces as a stand-in for the
  licensed "GT Ultra Fine" headline face used on tovfurniture.com — swap the
  `next/font` import in `src/app/layout.tsx` for the real font file when
  you have a license/webfont for it.
- Add new components under `src/components/ui/`, then add a matching doc
  page under `src/app/components/<name>/page.tsx` and a nav entry in
  `src/lib/nav.ts`.

## Deploying for the team

Any Next.js host works (Vercel, Netlify, a VPS via `npm run build && npm
start`). Vercel is the path of least resistance — just remember the asset
storage caveat above before relying on uploads in production there.
