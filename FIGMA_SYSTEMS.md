# Figma Systems Manifest

This is the source-of-truth ledger for the multi-file design system structure.
Figma is authoritative — this repo's `src/` is a *transfer target*, synced from
these files deliberately, not automatically. Every transfer gets an entry in
that system's Sync Log below so changes stay traceable.

Structure: one shared **Core** system (foundations + base atoms), plus a
separate Figma file per site template. Each template system consumes Core's
published library rather than redefining tokens.

## Systems

| System | Figma file | Status | Last synced into code |
|---|---|---|---|
| Core (foundations + atoms) | [TOV Design System — Core](https://www.figma.com/design/5aVhd2ZmqVDG61uN3Ruas5) | 🟡 in progress (Brand + Color + Typography + Components pages populated) | Logo (2026-09-10), Color + Typography (2026-09-16), Button + Badge (2026-09-17) |
| Homepage & Marketing | not yet created | ⚪ not started | — |
| Collection (PLP) | not yet created | ⚪ not started | — |
| Product (PDP) | [TOV26 — B2C — PDP Design System](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J) | 🟡 in progress (Price mapped) | Price (2026-09-17) |
| Cart & Checkout | not yet created | ⚪ not started | — |
| Account | [TOV - B2C - Design system → 👤 Account Components](https://www.figma.com/design/DTjIdCKhnDUVvJhEfpn10v?node-id=1777-1912) | 🟡 in progress (all 10 sets + 6 page layouts mapped; still Status=Draft in Figma) | Full canvas (2026-09-29) |
| Editorial Pages | [New Arrivals](https://www.figma.com/design/tefhO0Dx4CNYT09diRqfB2/TOV26---B2C---New-Arrivals-Refresh?node-id=1-7) / [Collections LP](https://www.figma.com/design/oO2Li1XutYUUAgUUs4f3lJ/TOV26---B2C---Explore-collections-LP---1442?node-id=1-5) / [Collection Individual](https://www.figma.com/design/9xYNBPcAsKBOCCGP5X6wJ9/TOV26---B2C---Collections-on-TOV---4624?node-id=2159-2814) / [TOV Edits](https://www.figma.com/design/PXf8n9b6WW5X5ZkYqiykJH/TOV26---B2C---TOV-Edits---5680?node-id=1-4) | 🟡 in progress (New Arrivals, Collection [Landing + Individual Page], and TOV Edits [Directory + Individual Page] all mapped, all reusing the shared Product Grid; several new page-specific pieces built per page but pending Shay's sign-off — see Sync Log) | Product Grid reuse across all 4 files; PDPBreadCrumbs reuse on TOV Edits (2026-09-23) |
| Amazon — A+ Content | [TOV26 - Amazon - Premium A+ content](https://www.figma.com/design/P6ISgCbxCzraEqRtTr0j3P) | 🟢 modules mapped (Brand Story, Category Hero, Materials, Video Thumbnail, Comfort & Construction, Sustainability); Collections Module not started | 2026-10 |
| Amazon — Store | [TOV25 - B2C - Amazon store](https://www.figma.com/design/I95mnwwaoq0CvJOGop9tfn) | 🟢 Storefront mapped; Best Sellers, Category Pages, Subcategory Components, About Us not started | 2026-10 |
| B2B — Design system | [TOV26 - B2B - Design system](https://www.figma.com/design/CGe5J4j6AI5uus5G2f8iqh) | 🟢 Foundations (Color, Typography, Spacing & Radius, Layout), Homepage components, and the full Dashboard (atoms, molecules, organisms, templates) mapped | 2026-10 |
| B2B — Trade Platform Redesign | [TOV26 - B2B - Trade Platform Redesign - 4256](https://www.figma.com/design/aac2MgoPZQBdvsWFKhzMkj) | 🟢 Homepage (node 7377:2950) and Menu Panel (node 6826:717) mapped | 2026-10 |
| Forms — Claims form | [TOV26 - B2C - Claims form - 2864](https://www.figma.com/design/fAR8Q5JFFhzwMVslVENoHr) | 🟢 Form elements mapped to Input & Select (input, textarea, checkbox, option cards, product option card, file upload, progress, summary row, form step card) | 2026-10 |

**Update (2026-09-16):** the note below calling the OG file "legacy
reference only" is superseded for one specific part of it. The original
[TOV - B2C - Design system](https://www.figma.com/design/DTjIdCKhnDUVvJhEfpn10v/TOV---B2C---Design-system)
file's **"🖌️ TOV Styles" page is now the direct, actively-watched source of
truth for foundational tokens** — per Shay: "That link I sent is the source
of truth." That page contains six clean "Export Sheets" (Color, Typography,
Spacing, Radius, Effects, Grid — node `15:285`), each a self-contained
reference frame, unlike the messier Brand page (which mixed real content
with borrowed UI-kit instances needing detach/rebind). We read real values
straight from these sheets via bound-variable resolution (never trust the
sheets' own text labels — several are stale, e.g. "HEX #3E7BFA" appearing
under swatches that are actually completely different colors) and mirror
them into both the app and fresh local Core variables. The rest of the OG
file (components, Brand/Personas page, etc.) still follows the original
copy-paste-then-detach workflow into Core.

**Decision (2026-09-10): Core stays a separate, brand-new file** (not a
restructure of the OG file). At the time, PDP's Figma file was assumed to be
built against the OG library, which would have needed a manual migration to
Core. **Correction (2026-09-17):** PDP turned out to be its own self-contained
file with its own "💠 Components" page — not built against the OG library at
all. No OG→Core migration is owed for PDP; that assumption was wrong.

**Editorial Pages (added 2026-09-15, rescoped 2026-09-23):** a 6th system
covering TOV's editorial page family, expected to grow over time (Shay's
words: "we may add to this eventually"). Originally scoped as 5 separate
page types (New Arrivals, Collections — Landing, Collections — Collection
Page, TOV Edits — Landing, TOV Edits — Edit Page); per Shay, the landing +
individual-page split within each of Collections and TOV Edits was more
granularity than needed — collapsed to 3 page types: **New Arrivals**,
**Collection** (directory + individual collection page together), and
**TOV Edits** (directory + individual Edit page together). Note
"Collection" here is a curated editorial concept, distinct from the
standard category/PLP browsing pages in the "Collection (PLP)" system above.

## Page-level components (code structure, 2026-09-15)

The code app now mirrors this file's system breakdown directly: a "Pages"
nav section with one stub page per template (`/pages/homepage`,
`/pages/collection`, `/pages/product`, `/pages/cart-checkout`,
`/pages/account`), plus a separate "Editorial Pages" nav section with one
page per page type under `/pages/editorial/*` (new-arrivals and tov-edits —
mapped; collection — still a stub) — see
`src/components/docs/PageSystemStub.tsx`, shared by the still-stub ones. Each
lists its *planned* page-level components (compositions of the atoms under
Components — e.g. a Product Gallery combines Badge + Rating + Price).
Nothing is built yet; these are structural placeholders so the two
organizational systems (this manifest, and the code app's nav) stay in
lockstep as each template gets built out. Update a stub page's `planned`
list and status together with this file's Systems table as work starts.

## How a transfer works

1. A piece of a system (a token, a component) gets finalized in its Figma file.
2. We pull it into code (`src/lib/tokens.ts`, `src/components/ui/*`, or a new
   system-specific folder once template systems exist).
3. An entry goes in that system's Sync Log below: what changed, the Figma
   node/component referenced, and the date.

## Component change tracking

See **[COMPONENT_CHANGELOG.md](COMPONENT_CHANGELOG.md)** — started 2026-09-10.
v1 (manual) is a ledger entry + a note in a component's Figma `description`
field, written by hand whenever a change is found.

**v1.5 (2026-09-16): visible in the app, not just markdown.** Every synced
doc page now renders an actual "Change tracking" table
(`<ChangeLogTable page="..." />`, reading `src/lib/changelog.ts`) — Shay's
call, so anyone using the app sees a page's history without opening
COMPONENT_CHANGELOG.md. Log a change in both places (see that file). First
page wired up: Brand.

**v2 (automatic detection), built 2026-09-10 — see `src/lib/figma-watch.ts`:**

- **Scope**: a curated watch list of specific nodes we've deliberately
  pulled into Core (currently: the Logo mark, both taglines, the 3 Logo
  component variants, the Color and Typography Export Sheets, and the
  Button/Badge frames) — not the whole file. Adding something to Core adds
  it to `WATCH_LIST`.
- **What counts as a change**: fills/strokes (color), corner radius, variant
  properties, and description text on a watched node.
- **Trigger**: designed for a Figma webhook (`FILE_UPDATE` event) hitting
  `/api/figma-webhook` — but Figma can't reach `localhost`, so this is
  **inert until the app is deployed publicly**. (2026-10-08: the deployed site also runs a daily scheduled check at `/api/figma-watch/cron`, set up in `vercel.json` and authorized by the `CRON_SECRET` environment variable, so detection does not depend on the webhook.) To register once deployed:
  ```
  POST https://api.figma.com/v2/webhooks
  { "event_type": "FILE_UPDATE", "team_id": "<TOV Design team id>",
    "endpoint": "<deployed-url>/api/figma-webhook",
    "passcode": "<FIGMA_WEBHOOK_PASSCODE from .env.local>" }
  ```
  Until then, the same check runs on demand: the "Check now" button on the
  app's Overview page, or `POST /api/figma-watch/check`.
- **Report**: a structured entry (what changed, old → new, a Figma link,
  timestamp) written to the drift log (Vercel Blob `figma-watch/drift-log.json` when `BLOB_READ_WRITE_TOKEN` is set, otherwise `storage/figma-watch/drift-log.json`); fingerprints are stored the same way in `snapshot.json`.
- **Tag**: detected drift shows as an **"N unreviewed"** badge in the
  Overview page's "Figma sync status" card — that's the early-warning
  signal. It does **not** touch code or flip any component's "Updated"
  badge by itself (Shay's call: flag only, human decides) — that still
  needs an explicit sync pass, same as every transfer in this file. Once
  reviewed, "Mark reviewed" clears it from the unreviewed count.
- **Requires** `FIGMA_TOKEN` in `.env.local` (same one the Asset Library
  uses) — without it, checks fail with a clear error rather than silently
  doing nothing.

## Sync Log

### Core

- _2026-09-10 — file created ([link](https://www.figma.com/design/5aVhd2ZmqVDG61uN3Ruas5)), empty. First population pending — deciding page/frame structure with Shay before adding content._
- _2026-09-10 — Logo pulled into code ahead of Figma: started from the OG
  file's 🏷️ Brand page ([node 50:418](https://www.figma.com/design/DTjIdCKhnDUVvJhEfpn10v/TOV---B2C---Design-system?node-id=50-418)),
  which documents Primary/Secondary/Tertiary logo usage, a standalone logo
  mark, and two "Don't Be Boring" tagline lockups (assets saved to
  `public/brand/`). Shay then supplied an updated redraw via a Claude Design
  canvas ("TOV Logo Guidelines"), which is now the canonical version in
  `src/components/ui/Logo.tsx` and `public/brand/tov-logo.svg`. The split-"O"
  accent color `#F9D2D2` was cross-confirmed across all three sources
  (Figma's vector fill, its rendered screenshot via pixel sampling, and the
  new redraw) — note the OG file's on-canvas text label ("HEX #c4a092") is
  stale/wrong and should not be trusted. New token: `--color-brand-pink`.
  Not yet added to the actual Core Figma file — code is ahead of Figma here._
- _2026-09-10 — logo added to the actual Core Figma file: renamed "Page 1"
  to "🏷️ Brand" and placed the wordmark as a fresh, local vector node (built
  via `figma.createNodeFromSvg`, not copied/linked from the OG file — no OG
  dependency at all) alongside a title and description. Verified with a
  screenshot. Code and Figma are now in sync for the logo specifically._
- _2026-09-10 — Shay copy-pasted the OG file's whole 🏷️ Brand page content
  (Logo tokens + Personas) into Core directly in Figma, superseding the
  hand-built placeholder above. Migrated it off the OG library: detached 5
  component instances (Logo mark, Tagline, Taglin 2, and 2 "Logo" variant
  instances), created 4 new local Core variables (`TOV Pink` #F9D2D2,
  `Truffle` #82736C — newly discovered brand color, not yet in code —
  `Cream` #FEFBF6, `Not black` #3F3D3E) and rebound every fill/stroke that
  used the OG equivalents over to them, and cleared 2 generic "White" style
  references. Left the pasted content's generic UI-kit padding/spacing/
  border variables untouched (template layout chrome, not real TOV tokens —
  not worth importing into Core). Verified with a screenshot — nothing
  broke. Then renamed the leftover "Logo" component set's 3 variants
  (`Property 1=Default/Light/Dark`) to the `Version=/Viewport=/Status=`
  convention, all `Status=Live` per Shay's confirmation — see
  [COMPONENT_CHANGELOG.md](COMPONENT_CHANGELOG.md)._
- _2026-09-10 — closed the loop into code: added a "Brand" page under
  Foundations (`/foundations/brand`) presenting the primary/secondary/
  tertiary logo, the logo mark, and both tagline lockups, adapted from the
  Figma Brand page's own usage guidance. Previously the Logo component
  existed in code but had no docs page — the nav had no Brand section at all._
- _2026-09-15 — Iconography added to code, pulled from the OG file's icon
  library page ([node 19:451](https://www.figma.com/design/DTjIdCKhnDUVvJhEfpn10v/TOV---B2C---Design-system?node-id=19-451))
  — a large, real TOV icon set (Old icons/New icons/PDP icon row), not a
  placeholder. That node was too large for get_metadata (size limit), so
  extraction went through the flattened SVG export instead: downloaded it,
  parsed layer names + path data locally to isolate individual icon groups
  and compute correct per-icon viewBoxes. Pulled 53 icons across three
  categories (Ecommerce, General UI, Arrows) into `public/icons/` and a new
  `/foundations/iconography` doc page. Not yet added to the actual Core
  Figma file — code is ahead of Figma here, same pattern as the logo
  initially was. Many more categories exist in the source (Files, Devices,
  Weather, Finance, Support, Development, etc.) — deliberately not pulled
  in yet; add more only as real screens need them._
- _2026-09-16 — Colors mapped from the OG file's "🖌️ TOV Styles" page →
  Color Export Sheet ([node 22:32960](https://www.figma.com/design/DTjIdCKhnDUVvJhEfpn10v?node-id=22-32960)),
  designated the direct source of truth for foundational tokens (see the
  note above the Systems table). Resolved via bound-variable scanning, not
  the sheet's stale text labels. Full 52-color named palette (Primary:
  Cream/Soft taupe/Stone/Terracotta/Truffle; Secondary: Mauve/Ritual/Mint/
  Lagoon/Forest/Lavendar/Pebble/Golden/Sunshine; Tertiary: Rouge/Bold lip/
  Rosewood/Rose/Chocolate/Not black/Muse/Impression/Essence/Teal/Earth/
  Storm/River/Burnt umber/Caramel/Fog; Neutral 100–1000; Status Red/Green/
  Yellow ramps) — added to `src/lib/brandPalette.ts` and rendered on
  `/foundations/color` above the existing functional tokens. Confirmed our
  existing `--color-primary` = "Rouge" and `--color-charcoal` = "Not black."
  Also mirrored into Core: extended the "Colors" variable collection from 4
  to 53 variables (renamed the 3 existing to match the grouped
  Primary/Secondary/Tertiary/Neutral/Status naming — safe, doesn't break
  the Brand page's existing bindings) and built a matching visual swatch
  page in Figma. Bonus find: confirmed the real display font name is
  "GT Ultra Fine Trial" (from the same page's Typography Export Sheet).
  Added `brand-color-palette` (OG node 22:32960) to the automatic drift
  watch list per Shay's request — see `src/lib/figma-watch.ts`._
- _2026-09-16 — Typography mapped from the same "🖌️ TOV Styles" page →
  Typography Export Sheet ([node 22:33269](https://www.figma.com/design/DTjIdCKhnDUVvJhEfpn10v?node-id=22-33269)).
  The file documents two complete parallel 12-step scales (H1–H7, B1–B5):
  one all-Montserrat, one all-"GT Ultra Fine Trial" (including body) — used
  `figma.getLocalTextStylesAsync()` to get real values, not the sheet's own
  labels (one of which is stale: claims body is "Montserrat Black", but the
  actual style is Regular/400 — same pattern as Color). First pass merged
  these into one hybrid scale (GT Ultra heading sizes + Montserrat body
  sizes); **corrected per Shay's request** to instead reproduce both scales
  in full, side by side, exactly as Figma organizes them — the hybrid
  pairing is now a supplementary callout ("what's actually live on
  tovfurniture.com") rather than the primary structure. Confirmed the real
  display font name: **"GT Ultra Fine Trial"** (code still uses Fraunces as
  a placeholder — no licensed copy of the real font available to load).
  `src/lib/typeScale.ts` exports `MONTSERRAT_SCALE` and `GT_ULTRA_SCALE`
  (12 steps each), rendered as two parallel tables on
  `/foundations/typography`. Mirrored into Core: 24 real Figma text styles
  (`Montserrat/H1`–`H7`+`B1`–`B5`, `GT Ultra Fine Trial/H1`–`H7`+`B1`–`B5`)
  and a "🔤 Typography" page showing both scales stacked, matching the code
  layout. Added `type-scale` (OG node 22:33269) to the drift watch list;
  extended `figma-watch.ts`'s fingerprint to also track text font/size/
  line-height, not just fills — the original version would have missed
  typography changes entirely._
- _2026-09-16 — the real "GT Ultra Fine Trial" font file is now actually
  loaded (no more Fraunces placeholder). It's a licensed commercial font
  (Grilli Type), so it can't come from Google Fonts — but since it's
  already live on tovfurniture.com, the exact file being served there
  (`GT-Ultra-Fine-Regular.woff2`, from their own Shopify CDN) is by
  definition already public. Downloaded it via the site's own network
  requests, saved to `public/fonts/`, wired up in `src/app/layout.tsx` via
  `next/font/local` (replacing the `next/font/google` Fraunces import).
  Only the Regular weight — that's what's actually served live and matches
  the Typography Export Sheet. Verified rendering correctly on
  `/foundations/typography`, matching the Core Figma screenshot exactly._
- _2026-09-17 — Button and Badge mapped from the OG file's "📛 Buttons,
  Badges" page ([node 1611:4711](https://www.figma.com/design/DTjIdCKhnDUVvJhEfpn10v?node-id=1611-4711)).
  **Button**: 3 variants × 2 states (Primary/Secondary/Tertiary ×
  Default/Hover), all pill-shaped. Bound-variable scanning gave a result
  that contradicted the visual screenshot for 2 of the 6 states
  (Primary/Hover and Tertiary/Default both came back with the same dark
  fill + dark text as their non-hover/non-tertiary counterparts — which
  would be unreadable if true). Resolved by pixel-sampling full-resolution
  screenshots of all 6 states directly: the real pattern is Primary and
  Tertiary *invert* on hover (solid charcoal ↔ cream-with-charcoal-outline),
  while Secondary goes solid pink → solid charcoal. Root cause is the same
  class of issue as the Limited Edition badge below — root-instance
  `.fills` isn't always trustworthy; screenshot pixel-sampling is the
  fallback. **Badge**: 9 real named product tags (New Arrival, New Arrival
  · Sale, Best Seller, Best Seller · Sale, Final Sale, Sale/Mauve,
  Sale/Lagoon, Hot List, Limited Edition), each in Large/Medium/Small, all
  pill-shaped — 8 of 9 resolved cleanly via bound-variable scan of each
  variant's root fill; Limited Edition's fill is a real `GRADIENT_LINEAR`
  (`#E4D7BA` → `#CCB583`), which the resolver only handled for `SOLID`
  paints, so it read as `null` — fixed by reading the fill's own
  `gradientStops` directly (better than the pixel-sampled approximation
  used as a stopgap mid-session). Confirmed two more stale-label cases in
  this file: the frame named "Tag - Sale" displays "FINAL SALE", while two
  *separate* component sets both literally named "Tag - Sale dark" display
  "SALE" — disambiguated by their real bound colors (Mauve vs. Lagoon), not
  their names. Code: rewrote `src/components/ui/Button.tsx` (kept "ghost"
  as a 4th, app-chrome-only variant not in the real system) and
  `src/components/ui/Badge.tsx` (kept the 4 pre-existing generic variants
  — new/sale/success/neutral — as app-chrome-only indicators, e.g. the
  "Updated" badge, alongside the 9 real ones). New tokens: `--color-burnt-
  umber`, `--color-mauve`, `--color-lagoon`. Mirrored into Core: added a
  new "🧩 Components" page with fresh Buttons and Badges frames, all fills
  bound to the existing `Colors` variable collection (no new variables
  needed — Burnt umber/Mauve/Lagoon/TOV Pink/Not black/Cream already
  existed from the Color sync). Added `button-frame` (OG node 64:91) and
  `badge-tags` (OG node 65:2102) to the drift watch list; extended
  `figma-watch.ts`'s fingerprint to also track gradient stops, not just
  solid fills — the original version would have silently missed a change
  to the Limited Edition gradient. Out of scope, noted for later: the
  Buttons page also contains several other real components not requested
  this pass (Quantity stepper, Size selector, Size/color swatch picker,
  Orientation toggle, Review search bar, Wishlist button, Shop bag button,
  Load More button)._
- _2026-09-17 — Iconography corrected: Shay flagged that the General UI (22
  icons) and Arrows (8 icons) categories didn't fit what's actually on the
  site. Investigated the OG file's icon library page ([node 19:451](https://www.figma.com/design/DTjIdCKhnDUVvJhEfpn10v?node-id=19-451))
  and found it has three sections — "Old icons" (deprecated), "New icons"
  (current, "consistent style"), and "Icon row" (real site-usage examples).
  The original 53-icon extraction pulled Ecommerce correctly from "New
  icons," but General UI and Arrows turned out to come from a large generic
  reference icon *kit* nested inside the same page (categories: General,
  Arrows, Media, Time, Emojis, Files, Text & Editing, Education, User,
  Charts & Tables, Cloud, Security, Health, Call, Transport & Logistics,
  Devices, Weather, Finance, Location, Messaging, Support, Development,
  Activities) — someone's imported UI-kit reference, not TOV content. Fixed
  by removing both categories (30 icon files deleted, confirmed unused
  elsewhere via grep first) and replacing them with the file's own
  genuinely TOV-specific "Info icons" section (same page, labeled that in
  Figma) — 43 real PDP/support icons: assembly & hardware (Tools, Hammer,
  Adjustable height, Headboard, Wall mount, ...), materials & care
  (Mattress, No slip rug, Indoor outdoor, Wood, Sustainable, Easy clean,
  ...), customer service (Gift ribbons, Warranty, Chat, Customer service,
  SOS, ...), fulfillment (Location change, Care, Change, Return, Install
  1-3), and room visualization (In room 1-3). Extraction technique:
  `download_assets` per-component with `defaultFormat: "svg"` on the
  `export` field specifically — the `svgAssets` field fragments any
  multi-path icon into one file per disjoint shape (e.g. "Mattress" came
  back as 7 separate files), while `export` with an explicit SVG format
  merges the whole component into one clean file. Also had to strip an
  unclipped `<rect fill="#AEAEAE"/>` background square that download_assets
  leaves behind on every export (harmless-looking in isolation, but not
  transparent — verified by rendering all 43 in a throwaway page before
  committing to the extraction). Fixed 3 source typos along the way (No
  mattres → no-mattress, Romovable cushion → removable-cushion, Percemtage
  → percentage) and renamed one icon (return → service-return) to avoid
  colliding with the existing Ecommerce "return" icon. Not yet added to the
  drift watch list — Iconography as a whole still isn't watched (code has
  been ahead of Figma here since the original extraction)._
- _2026-09-17 — General UI (47 icons) and Arrows (29 icons) re-added:
  Shay confirmed the site genuinely needs a complete general-UI icon set, so
  this wasn't a rejection of the categories themselves — just of the sloppy
  original pull. Same source as before (the "General" and "Arrows"
  categories nested in the reference kit inside the OG file's icon library
  page, node 19:451), still excluding the actually-unrelated categories in
  that same kit (Weather, Finance, Health, Emojis, etc.). This time
  extracted one component at a time via `download_assets` with
  `defaultFormat: "svg"` reading the `export` field (not `svgAssets`, which
  fragments multi-path icons — see the Info icons entry above for why),
  stripped the same unclipped background rect from all 76 files, and
  rendered the full batch in a throwaway page before copying into
  `public/icons/`. Fixed two more source typos ("arows-vertical" →
  "arrows-vertical", "radio-button-" trailing dash → "radio-button").
  Iconography now covers 142 icons total (Ecommerce 23, Info icons 43,
  General UI 47, Arrows 29)._

### Navigation & Footer

- **2026-09-23 — Main Nav, Footer, Footer Icon Row mapped; Mobile Navigation and Footer
  Icon Row renamed as a prerequisite.** OG file, canvas "🧩 Navigation & Footer" (node
  `3:940`). Shay: "I have renamed everything in this file so we should be good to go" —
  mostly true, but two pieces were still in raw `Property 1=` naming (Mobile Navigation's
  6 submenu states, Footer Icon Row's 4 variants) — flagged and renamed first via the
  `rename-figma-variants` skill before mapping, same prerequisite pattern as the Homepage
  canvas.
  - **Main Nav** (Navbar, node `1340:3009`) — a real 11-variant set, originally logged
    here as **all `Status=Draft`, no Live variant at all**, and built as just the plain
    "Default" look on that basis. Shay corrected this the same day, pointing at the same
    node: "they are all live the names are wrong so they all need to be changed to live
    and added here." Renamed all 11 to `Status=Live` and mapped every one:
    - **Default** (Desktop `1340:3008` / Mobile `1341:3963`) — the base header at rest.
    - **Navbar 2** (`1365:8169`) — search-activated: the icon becomes a full input
      ("Search term here" placeholder) + account/wishlist/cart icons, secondary/primary
      link rows replaced.
    - **Navbar 3** (`1360:3882`) — condensed/sticky-on-scroll: logo + primary nav only,
      no announcement bar or secondary links.
    - **Condensed** (Mobile, `1360:3564`) — the same sticky-on-scroll idea for Mobile:
      just logo + icons, no promo bar or search pill.
    - **Navbar 6-11** (`1365:7362/7512/7614/7720/7840/7947`) — the primary nav's category
      mega-menu dropdowns (Furniture/Lighting/Decor & Tabletop/Outdoor/Wall Art &
      Mirrors/Sale). Each real dropdown is a quick-links column (New/All X/Best
      Seller/Hot List/Contract Grade X/Collections/Sale) + 2-5 real subcategory columns
      (some further split into sub-groups, e.g. Furniture's "Living Room" →
      Seating/Tables) + a 412px promo panel (no real image/collection name in the
      source — left as the established checker placeholder). Extracted full real
      subcategory content for all 6 categories via targeted text scans, not invented.
    Desktop Default: dark announcement bar (two rotating promo messages) + logo/search
    row + a secondary utility-links row (10px uppercase) + the primary category nav
    (12px). Mobile Default: announcement bar + hamburger/logo/wishlist/cart row + a pill
    search bar. The link rows are genuinely 1440px wide in Figma (no scroll in the real
    design) — added `overflow-x-auto` as a docs-preview affordance only, not a
    reproduction of real nav behavior.
  - **Footer** (node `65:1143`) — real Live variants for both Desktop (`65:1144`) and
    Mobile (`65:1196`); Draft alternates of each exist but weren't built. Identical real
    content on both viewports (Support + Company link columns, legal line) — Mobile just
    reflows narrower.
  - **Footer Icon Row** (node `1688:3759`) — 3 real cards (Trade Program, Design Box,
    Registry), each icon + heading + description + "Join Now" link. Renamed from
    `Property 1=Default/Variant2/Variant3/Variant4` to a real 4-variant Live set (2 looks
    × Desktop/Mobile) — both looks share identical content, differing only in card height
    (168px vs. 208px Desktop) with no visible content difference behind it, so built as
    one shared layout rather than reproducing an invisible height difference. Icons are
    approximated from the existing library (`certified` for Trade Program) — no real icon
    was extracted from Figma for these 3 cards.
  - **Mobile Navigation** (submenu drill-down states, node `1688:3862`) — renamed to
    `Version=Default/Main Menu/Furniture/Lighting/Outdoor/Decor & Tabletop,
    Viewport=Mobile, Status=Draft` (6 real states: collapsed bar, expanded main menu, and
    4 category-specific drill-downs, confirmed via real content — "Furniture" state
    contains "Living Room / SEATING / Sofas," etc.). **Not yet built into code.**
  - **"Search" turned out to be 7 separate real UI types**, not one component: Type A (by
    product, ~55% of search volume per Figma's own note), Type B (material/attribute),
    Type C (SKU/product name), Type D (compound search), Type E (collection/style name),
    Returning Users, and No Results — each with its own Desktop/Mobile pair, named just
    `Viewport=Desktop`/`Viewport=Mobile` (no `Version=`/`Status=` at all, not touched by
    any rename pass). Shay confirmed mapping all 7. **Not yet built into code** — next up.

- **2026-09-24 — "Quickly map everything else on this page."** After the icon-correction
  pass, Shay asked to map every remaining real component on the Navigation & Footer
  canvas — Email Sign Up, Mobile Navigation's 6 drill-down states, and all 7 Search
  types — with an explicit fidelity bar: "I don't want fonts, icons, colors or any part
  of the UI to differ from what is in the figma."
  - **Email Sign Up** (node `1688:3636`) — trivial 2-variant set (Desktop/Mobile), solid
    charcoal bg. Built directly; only real snag was the Desktop heading getting crushed to
    one-word-per-line in the narrower docs Preview box — fixed with the same
    `overflow-x-auto` + `min-w` affordance used elsewhere for full-bleed components.
  - **Mobile Navigation** (node `1688:3862`) — built as `MobileNav.tsx`. Dispatched as a
    background agent first; the agent failed immediately with "Figma MCP server not
    authenticated" — confirmed Agent-tool subagents do NOT inherit this session's already-
    authenticated Figma MCP connection, so all further Figma-dependent work this pass was
    done directly in the orchestrating session, not delegated. Extracted real subcategory
    content per category (Furniture has SEATING/TABLES sub-groups under "Living Room",
    other groups don't), a real chevron icon (exported new as `chevron-thin-left/up/
    right.svg` — same base shape reused rotated for back/expand/forward, `#777777`,
    sharper vertex than the existing `chevron-left.svg`) and 4 new social icons (Instagram/
    YouTube/Pinterest/TikTok, none existed in the library). Flagged, not fixed: Furniture →
    Living Room → Tables repeats "Benches & Ottomans" (already under Seating), and Decor &
    Tabletop → Entertaining lists "Dinkware" (reads like a typo for "Dinnerware").
  - **Search** (parent frames under `1696:*`) — the big one. A second background agent,
    dispatched in parallel for Types A/B/C, ran ~17 minutes and actually succeeded (unlike
    the Mobile Nav agent) — apparently subagent Figma access is inconsistent rather than
    uniformly blocked. Its Type A/C output duplicated what the orchestrating session had
    already built directly (real photos) with its own placeholder-based version (built
    before Shay's real-photo decision existed) — discarded in favor of the already-verified
    real-photo versions. Its Type B exploration (the most complex type: 4 variants, a real
    category filter panel, a genuine "See all products (310)" button only on Bottom
    Scroll, a trailing-colon inconsistency, the "Sofas" chip's `text-primary` color) was
    genuinely valuable and saved re-deriving all of it — rebuilt with real photography to
    match every other type instead of its `.bg-image-placeholder` choice.
  - **Real photography, not placeholders**: unlike Homepage/PDP (empty image fills in
    Figma), every Search product card has a real, distinct photo. Asked Shay directly
    given the fidelity-vs-speed tension; chose "Extract real photos" — every product/promo
    image was pulled via `get_screenshot` on the exact image-fill node and saved under
    `public/images/search/`, reused across types wherever the same product recurs (e.g.
    Type C and No Results both reuse Type A's Dex Vegan Mohair Ottoman photo; Returning
    Users reuses Type B's Callie/Yara/Mel photos).
  - **Two real "hidden but present" layer patterns found and correctly excluded/included**:
    Types A/C/D/E all contain the same category-sidebar layer tree as Type B, but at
    `opacity: 0` — confirmed via the Plugin API, not assumed, and correctly omitted. The
    "Summer Vacay" SALE promo banner, by contrast, genuinely renders in every Desktop
    screenshot (just mostly covered by the results panel, peeking through at the bottom) —
    included as a real composited image (Figma bakes its own text into the export) rather
    than excluded as cruft.
  - **Two real content bugs surfaced in Type B's Mobile grid**, both kept verbatim per
    Shay's "flag problems, don't invent" instruction: card 2 is titled "Callie 84″ Velvet
    Sofa" but its swatch colors match Yara's; card 3 goes further — same title, Callie's
    own correct swatches, but its actual photo is the Mel Faux Mohair Velvet Bed (confirmed
    by screenshotting that exact card node directly, not assumed from the pattern). Type D
    Mobile card 2 is a leftover Type A product ("Gertrude Yellow Gingham Linen Skirted
    Ottoman") shown under a swivel-chair search. Every type also repeats the Desktop-
    $1,499-vs-Mobile-$479 price split already flagged for Main Nav's Type A pass.

- **2026-09-24 — Corrective pass: "Navbar 2" was never a real interaction state.** Shay:
  "Look at the figma again, search is always active in the main menu" — the 2026-09-23
  build of Default had only a bare search icon and zero account/wishlist/cart icons,
  because the earlier `INSTANCE`-type node scan that produced the icon list happened to
  come back truncated and never surfaced them. Re-checked with `get_screenshot` on both
  `default-desktop.png` and `navbar2.png`: Default's real top row already has a full
  pill-shaped search bar (no placeholder text, unlike Navbar 2's "Search term here") plus
  profile/heart/cart icons — this was never a toggle, just how the nav always looks.
  Navbar 2 (110px tall) turned out to be a shorter variant of that same row missing only
  the secondary/primary link rows below it, not a distinct "click search to activate"
  state. Shay: "So basically you need to combine nav default and search active and make
  that the default. We don't have a state that is just the search bar and logo." Folded
  Navbar 2's content into `MainNavDesktop` and removed the separate `MainNavSearchActive`
  export/doc entry. Also caught in the same pass: the primary nav's "Sale" link has fill
  `{r:0.694,g:0.353,b:0.388}` = `#B15A63`, an exact match to the existing `--color-primary`
  token — applied `text-primary` to that one link instead of the default black.

- **2026-09-24 — Corrective pass: wrong icon assets across every nav state.** Shay:
  "correct the icons used in all the navigation states they are incorrect." Exported the
  real vectors via the Plugin API (`node.exportAsync({format:'SVG_STRING'})`) for every
  icon actually used in the Navbar nodes and diffed against the library:
  - `profile.svg` was a bold filled-silhouette person — Figma's real `Icons/profile`
    (node `1611:4808`) is a thin-outline circle-head-and-shoulder-arc icon. Replaced in
    place (only referenced by Main Nav).
  - `menu.svg` was, on inspection, a price-tag icon with two lines through it — not a
    hamburger at all, and not visually close to one. Figma's real hamburger (inside the
    Mobile Default instance, node `I1365:8607;6200:1491`) is a plain 3-horizontal-bar
    icon. Replaced in place.
  - The cart icon used `bag-outline.svg` (a thicker bag with a wide double strap).
    Figma's real `Icons/add-to-cart` (node `1611:4812`) is a thin single-arc-handle bag —
    matched against the existing `bag-alt-light.svg` asset (already in the library, just
    never wired into Main Nav) rather than adding a duplicate. Left `bag-outline.svg`
    itself untouched since Homepage components (`HomepageSocial`, `HomepageNewArrivals`)
    reference it for an unrelated context not covered by this pass.
  - `heart.svg`/`search.svg` were already the right shapes on inspection — left as-is.
  - Found two real icons a prior pass had dropped outright while drilling into each
    variant's node tree: **Navbar 3** (Desktop Condensed/sticky, node `1360:3882`) has
    its own search/wishlist/cart icon row (`Frame 1189`, just no account icon — the
    first icon there is a search icon, not profile, confirmed by exporting it) that
    `MainNavCondensed` had zero icons for; **Mobile Condensed** (node `1360:3564`) has a
    search icon between the logo and wishlist/cart (`Frame 1426`) that
    `MainNavMobileCondensed` was missing. Both added.

- **2026-09-26 — Corrective pass: Footer and Footer Icon Row were built almost entirely
  wrong.** Shay pointed at the real Figma link for both and asked for a match. The original
  builds (2026-09-23) put both components on a plain white background with small/centered
  content — reasonable-looking, but not what's actually in Figma:
  - **Footer** (node `65:1144` Desktop / `65:1196` Mobile) — real background is solid
    `#3F3D3E` (charcoal), every text node is white. A giant TOV wordmark sits as a
    background watermark next to (Desktop) or above (Mobile) the link columns — the same
    `Logo` component already used everywhere else, at 22% opacity, all-white (no pink "O"
    accent — confirmed only a single white fill exists on the logo's vector layers here,
    unlike its normal two-tone use). A real social-icons row (Instagram/TikTok/YouTube/
    Pinterest, white, 24px, node `Frame 302`) sits beside the legal line on Desktop and
    below the columns on Mobile — missing entirely from the first pass. One genuinely empty
    leftover frame ("TOV footer last line", 0.5 opacity, zero children — confirmed via the
    Plugin API) sits at the very top of the Desktop instance and was correctly excluded.
  - **Footer Icon Row** (node `1688:3760` Desktop / `1688:3810` Mobile) — same charcoal
    background as Footer, not white. Real layout is 3 **left-aligned** columns (Desktop) or
    a stacked column (Mobile) with a real 1px white divider between each (`Frame 1371`/
    `1372`, rotated 90° on Mobile to read as a horizontal rule) — not centered cards with no
    divider. All 3 icons are real, distinct outline vectors (`Group`/`palette`/`gift` in the
    node tree) that don't match the library's `certified`/`edit`/`gift` closely enough to
    reuse — exported directly via `node.exportAsync({format:'SVG_STRING'})` and saved as
    `footer-trade-program.svg`, `footer-design-box.svg` (a paint palette, not a pencil), and
    `footer-registry.svg` (gift box with ribbon, different shape from the library's own
    `gift.svg`). "Join Now" is real title-case text with `textCase: UPPER` as a style, not
    literal uppercase characters.
  - Both corrected components needed the same `overflow-x-auto` + `min-w` docs-preview
    affordance as other full-bleed Desktop components once the real (much wider) layout was
    reproduced — without it, the fixed-width children were squeezed/overlapping in the
    narrower `Preview` box instead of scrolling.

### Homepage & Marketing

- **2026-09-22 — Variant naming migration (no component mapping yet).** Homepage lives on
  its own canvas in the OG file (`DTjIdCKhnDUVvJhEfpn10v`, canvas "🏡Homepage Components",
  node `1059:3763`) — 9 real sections top to bottom: Global Promo Banner, Logo Bar,
  Categories (4 card types: Living Room/Accent Chairs/Outdoor/Storage, + a separate Mobile
  Categories set), New Arrivals (+ New Arrivals Product Row), Promo Banner, In Stock,
  Collections (Collections Module 1 + 4 sub-card types: Chair/Storage/Nightstand/Side Table),
  About Us, Social (Social CTA Header + Social Post Container + a small "Social" pair +
  Get the Look). Unlike PDP/Core, this canvas had never been migrated off Figma's own
  auto-generated `Property 1=Default/Variant2/...` naming — no `Version=/Viewport=/Status=`
  signal to read at all before this pass. Ran the `rename-figma-variants` skill: proposed a
  full mapping to `HOMEPAGE_RENAME_PROPOSAL.md`, got Shay's sign-off (with corrections — see
  that file's top for the 4 deviations from the original proposal), executed in 4 batches (21
  sets / 46 variants), verified clean. Two component sets (`New arrivals mobile`,
  `Mobile product grid`) are standalone — not part of any variant set — left untouched per
  the convention's non-goals. **No component mapping into code has started yet** — this pass
  was naming-only, a prerequisite so the next PDP-style mapping pass can actually trust
  "Status=Live" here the way it does on PDP.

- **2026-09-22 — Global Promo Banner + Logo Bar mapped.** First two sections, top to bottom.
  Both real 2-/4-variant Live sets (no drafts to sort through, thanks to the rename pass
  above). **Global Promo Banner** — a cream pill (`#F1ECE5`, matches the existing
  `cream-200` token exactly) with centered promo copy; Desktop/Mobile differ only in outer
  side-padding (100px vs. 20px). **Logo Bar** — a cream-pill marquee of press/brand logo
  slots; in Figma it's an infinite-scroll mockup (the slot sequence duplicated end-to-end for
  a seamless loop) with every slot an empty placeholder frame — no real logo images anywhere
  in the file, and a literal "Banner text" label sitting off-canvas as an artifact of the
  loop duplication, not meant to be visible at rest. Simplified to one static,
  horizontally-scrollable pass of the 11 real slot widths; omitted the off-canvas label and
  the animation itself rather than reproducing either. 4 Live variants = 2 looks ("Logo Bar" /
  "Logo Bar 2") × 2 viewports — the "2" look flips which side carries the outer inset
  (Desktop base = 100px margin, Desktop 2 = full-bleed; Mobile base = full-bleed, Mobile 2 =
  20px margin), confirmed with Shay as just viewport/look labels, not a live/draft split.
  Added both to `WATCH_LIST` in `figma-watch.ts` per the standing rule — while doing this,
  noticed PDP's synced components were **never** added to `WATCH_LIST` despite that being a
  standing requirement; that's a pre-existing gap, not something introduced here, and is
  worth a dedicated pass later rather than folding it into this Homepage sync.

- **2026-09-22 — Remaining 7 sections mapped: Categories, New Arrivals, Promo Banner, In
  Stock, Collections, About Us, Social.** Per Shay: "map it all and then we can review."
  - **Categories** — 4 separate Desktop sets (Living Room/Accent Chairs/Outdoor/Storage),
    each a full-bleed image card with a left-aligned white label, plus a separate Mobile
    Categories component. Mobile's real displayed text ("Living room / Home Office / Outdoor
    / Bedroom") doesn't match its own layer names ("Living room / Accent chairs / Outdoor /
    Storage") — trusted the real text. Outdoor's Desktop `Default` variant has
    `cornerRadius: 0` and a horizontal layout in Figma (every other card is 36px radius,
    vertical) — read as an authoring inconsistency, kept the shared card uniform rather than
    reproducing the one-off.
  - **New Arrivals** — a lifestyle hero (bottom-overlay content area had no captured text in
    the source; kept just the image + overlay + a circular icon button) plus a *separate*
    4-card product row component ("Living room"/"Lighting"/"Entryway"/"Accent chairs").
  - **Promo Banner** — a cream rounded card, empty of content in the Figma source.
  - **In Stock** — hero card (headline + tag) beside a horizontally-scrollable 4-card
    product carousel with a next-arrow button, Desktop; a stacked hero + shorter product row
    on Mobile.
  - **Collections** — a full-bleed hero (content area empty in the source) + 4 separate
    sub-card sets (Chair/Storage/Nightstand/Side Table). Every sub-card's on-canvas text is
    stale/copy-paste — e.g. "Chair"'s live text literally reads "Living room" — used each
    set's own real name as the label instead.
  - **About Us** — full-bleed media hero; the Figma fill includes a `VIDEO` paint alongside
    an image, matching the section's own description ("features video content or fullwidth
    image").
  - **Social** — 4 separate pieces: a CTA header (cream banner, real heading/subheading +
    the existing `Button` component's `tertiary` variant reused for "Find us on social"), a
    row of shoppable Post Container cards (Short/Medium/Tall, real `bag-add` icon
    approximated with the existing `bag-outline` icon rather than extracting a new one), the
    small `Social` Desktop/Mobile pair (per the earlier rename), and a Get the Look card
    (product info row next to the thumbnail had no captured text in the source, left empty).
  - Hit a real layout bug twice while building: `aspect-[W/H]` + `w-full` on a flex item
    inside a `flex` row with sibling percentage-width items collapses to `0×0` in this
    browser engine (confirmed via computed `getBoundingClientRect()` — width and height both
    read `0` despite `aspect-ratio` computing correctly). Fixed by using CSS Grid instead of
    Flexbox for any row of same-sized `aspect-ratio` cards; a `flex` row only worked when
    children had an explicit pixel width (e.g. In Stock's carousel, `w-[312px]`) rather than
    a percentage/`w-full`. Verified against `getBoundingClientRect()`, not just a screenshot.
  - Added all 7 to `WATCH_LIST` in `figma-watch.ts`, same as Global Promo Banner/Logo Bar.
  - All 9 Homepage sections are now mapped — see `COMPONENT_CHANGELOG.md`.

- **2026-09-23 — Corrective pass: typography, missing content, wrong CTA styling.**
  Shay reviewed and flagged three problems with the previous day's batch: components not
  matching Figma typography, some text overlays missing entirely, some CTAs using the wrong
  styling. All three were real bugs, not intentional simplifications:
  - **Missing overlays** — the hero content on New Arrivals, Promo Banner, Collections, and
    About Us had all been reported as "empty in the Figma source" in the previous pass. They
    weren't empty — a depth-limited node dump (used to keep response sizes manageable) cut
    off right before reaching their real children. Every one of them actually has real
    heading + subheading + CTA-link copy (New Arrivals: "Just dropped" / "All New arrivals";
    Promo Banner: "Header here - promo banner" / "Supporting content here - promo banner" /
    "SHop the sale" — its own literal placeholder-style copy, reproduced as-is; Collections:
    "Shop the Amara Collection" / "...sculptural yet supremely comfortable." / "SHop the
    collection"; About Us: "Always in vouge, Never overpriced." — "vouge" is a typo in the
    Figma source itself — / same subhead / "about us"). Re-verified with a proper
    `findAllWithCriteria({types:['TEXT']})` scan targeted at each specific frame instead of a
    generic depth-limited dump — the same technique that worked correctly on Product Info
    Accordion earlier. In Stock had a similar issue: the heading was rendered at `text-3xl`
    (30px) instead of its real 46px, and its caption was wrapped in an invented
    `rounded-pill bg-white/20` badge that doesn't exist in the source (it's plain text) —
    there's also a second, genuinely empty pill frame sitting above the real content in
    Figma itself, read as leftover cruft and not reproduced.
  - **Typography approximated instead of read exactly** — several headings used generic
    Tailwind size classes (`text-3xl`, `text-4xl`) chosen by eye instead of the node's real
    `fontSize`. Get the Look's "Get the look" is 38px, not 30px. Social's "TOV + you" is 60px
    for most of the string — the Figma source itself has a genuinely inconsistent mixed-font
    glitch on the tail end of that string (a stray "Felix Titling" font on a single space,
    then Gotham Light) that reads as a copy/paste artifact, not intentional design, so it
    wasn't reproduced. Now using arbitrary-value Tailwind classes (`text-[46px]`, `text-[22px]`,
    etc.) instead of the nearest named size wherever the real value doesn't land on a
    standard Tailwind step.
  - **Wrong CTA styling** — the Social CTA Header's "Find us on social" button was built by
    reusing the shared `Button` component's `tertiary` variant, which is filled
    (`bg-cream-50`). The real Figma instance has `fills.visible: false` — fully transparent,
    just a charcoal border — which doesn't match any existing Button variant. Built inline
    instead of stretching `tertiary` to cover a fill it doesn't have. Get the Look's product
    row also got a real small "Add to cart" pill (charcoal fill, white 12px Gotham Medium
    text) that had been dropped entirely in the same missing-content bug above.
  - Also fixed: Mobile Categories' tiles were rendering at the same 20px as Desktop instead
    of their real 12px — `HomepageCategoryCard` gained a `size` prop for this.
  - **Process lesson**: when a node dump reports a frame as having no meaningful children,
    don't trust it if the dump used a depth limit — confirm with a scoped
    `findAllWithCriteria` text search before writing "empty in the Figma source" into a
    component's own doc comment. See `feedback-figma-sync-workflow` memory for the
    reusable version of this lesson.

- **2026-09-23 (2) — Second corrective pass: text-case, underline, letter-spacing, and
  alignment all missed.** Shay reviewed the first corrective pass and said typography was
  "still looking different... a bit of a departure." Investigated further and found the real
  cause: the first pass only ever checked `fontSize`/`fontFamily`/`fontName` on text nodes,
  never `textCase`, `textDecoration`, `letterSpacing`, or `textAlignHorizontal`. Every 14px
  Gotham Bold CTA/caption across the whole canvas (New Arrivals' "All New arrivals", Promo
  Banner/Collections/About Us's CTA links, In Stock's captions, Get the Look's "Add to cart")
  is `textCase: UPPER` + `textDecoration: UNDERLINE` in Figma — rendered in plain sentence
  case with no underline before this pass. The 20px/14px/12px card labels (main Category
  Cards, New Arrivals Product Row, Collections sub-cards, Mobile Categories) are also
  `textCase: UPPER` with `letterSpacing: 0.6px`. Worse: the 4 main Desktop Category Card
  labels were built **left-aligned** (`absolute bottom-5 left-5`) when the real node's own
  x/width (`(301.75-151)/2 = 75.375`) is centered — a plain positioning mistake, not a missed
  style property, present since the very first Categories pass. Fixed across
  `HomepageCategoryCard`, `HomepageProductCard`, `HomepageNewArrivals`, `HomepagePromoBanner`,
  `HomepageCollections`, `HomepageAboutUs`, `HomepageInStock`, and `HomepageSocial` — all
  underlined CTAs are now `uppercase`, all card labels are `uppercase tracking-[0.6px]
  text-center`. One clarifying note worth keeping: Figma's own mixed-case strings ("SHop the
  sale") are irrelevant once `textCase: UPPER` is applied — the *style* forces the rendered
  case regardless of the stored characters, so `uppercase` in CSS reproduces the real
  behavior without needing the underlying string "fixed."
  **Process lesson**: reading only `fontSize`/`fontFamily` and treating that as "the
  typography" was the gap both corrective passes trace back to — the full text-node property
  set (`textCase`, `textDecoration`, `letterSpacing`, `textAlignHorizontal`, `lineHeight`)
  needs to be checked every time, not just size and family. See `feedback-figma-sync-workflow`
  memory for the reusable version.

_Component mapping: complete (all 9 sections), corrected 2026-09-23 (twice). Ready for
Shay's review._

### Collection (PLP)

- **2026-09-26 — file identified + first mapping pass.** [TOV26 - PLP Designs System](https://www.figma.com/design/jDOs1dFChECKIYdAyPUkav)
  (fileKey `jDOs1dFChECKIYdAyPUkav`) — a separate file from the main B2C design system,
  self-contained like the PDP file. Shay linked node `7:635` (one variant deep inside a
  7-variant "Mobile Filters" set); walked up to the file's single `💠Components` page
  (`1:79`) to find the full scope: 3 sections — **Product Display** (Product Card ×3
  variants + Quick View hover state, Product Row, Root Category Hero ×2, "Expanded View -
  On Scroll" ×2 — a quick-shop panel that heavily overlaps the already-built PDP
  components), **Filters** (Filter Bar ×3 Desktop states + Mobile Filters ×7 variants), and
  **Marketing Modules** (~8 Desktop/Mobile promo-card variants, including a real "Create
  Your Configuration" CTA). Mapped this pass: **Product Card**, **Product Row**, **Root
  Category Hero**. Deferred: Filters, Marketing Modules, and the Expanded View quick-shop
  panel — each roughly Search-sized on its own; flagged rather than rushed.
  - **Product Card** (component set, real 3 variants: `Default` 342×507 Desktop, `Mobile`
    167×277, `Variant3` 167×301 — a denser grid look with a square 167×167 image and a real
    "+N more" swatch-overflow label instead of showing every swatch). Every field is
    Figma's own template placeholder content (checkered empty image fill, literal "Product
    name"/"$0000.00", flat `#CDCDCD` swatch squares) — matches the established
    placeholder-content convention (Homepage/PDP), not the real-photography approach used
    for Search, since Figma itself has no real photos here. Badge text ("BEST SELLER ·
    SALE"/"NEW ARRIVAL · SALE") is rendered as converted vector paths in the source, not
    live text — reproduced as real text with the same visual result. Selected swatch = a
    34×34 rounded box with a 1px `#3F3D3E` border around the plain 28×28 swatch (confirmed
    via the one real example in the source, first swatch only). A 4th "Quick View" instance
    turned out to be the same Default card with a "QUICK SHOP" pill revealed over the
    image — built as a `showQuickShop` prop, not a separate component.
  - **Product Row** — trivial: a horizontal row of Product Cards, 10px gap, 4 Desktop / 2
    Mobile.
  - **Root Category Hero** (real 2-variant set, Desktop `8:1264` / Mobile `8:1266`) —
    breadcrumb + 46px display-font title + a sub-category card row. The sub-heading is
    literally "B1 - Sub heading 80–120 characters" in the source — a content-authoring
    placeholder describing the copy length to write, not real copy — kept verbatim per the
    project's established rule for this exact pattern (see PDP's "Bread Crumbs" entry).

- **2026-09-26 — Reviews added mid-task from a 3rd file.** Shay asked to add Reviews right
  after the PLP request, linking back into the **main** design system file
  (`DTjIdCKhnDUVvJhEfpn10v`) at its own `💬Reviews` canvas (node `1612:4859`) — a
  genuinely separate, large sub-system: a `Reviews` summary/filter/card-list component
  (real 3-variant set: Default Desktop `152:3785`, Default Mobile `349:9086`, "Reviews 3"
  Mobile `152:3789` — a "Customer reviews" plain-heading look used in a different
  placement, same chrome otherwise), a 10-variant set of individual review-card layouts
  with photos/video (`Frame 1077`), and a full 8-variant "Write a Review" authoring flow
  (image upload + success states, Desktop and Mobile). Mapped the `Reviews`
  summary/filter/card-list block only (Default look, both viewports); flagged the other two
  as their own pass, same reasoning as the PLP deferrals above.
  - Star fill is `#F9D2D2` — an exact match for the existing `--color-brand-pink` token,
    **not** `--color-primary` like the PDP `Rating` component uses — built the star row
    inline in the new component rather than reusing `Rating.tsx`, since that color
    difference means it isn't really the same visual language.
  - Rating-breakdown bar track is `#F1ECE5`, an exact match for `--color-cream-200`.
  - 5 new icons extracted (none existed in the library close enough): `shield-check.svg`
    (the "Trusted by 1M+ Customers" header icon), `check-circle-outline.svg` ("Verified
    buyer"), `thumbs-up.svg`/`thumbs-down.svg` (the helpfulness vote — genuinely minimal
    single-path glyphs in the source, not simplified renders of a fuller thumb icon,
    confirmed by checking there were only 2 vector nodes total in that row).
  - "Write a review" and "load more reviews" reuse the existing `Button` component
    (`primary`/`tertiary` variants) rather than rebuilding button styling from scratch —
    the source's own button instances resolved to a shared "Button - large" component
    matching that same primary/tertiary split.

### Product (PDP)

- _2026-09-10 — not started. Assumed built against the OG library — see the
  2026-09-17 correction below._
- _2026-09-17 — file identified: [TOV26 — B2C — PDP Design System](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J)
  (fileKey `ySZYmjbO2Wck8u1JGAtI5J`), a full 2026 PDP redesign, self-contained
  (own "💠 Components" page, not built against the OG library — the
  2026-09-10 assumption was wrong, no OG→Core migration needed). Already uses
  the Version=/Viewport=/Status= naming convention — Shay had renamed its
  components/layers before sharing the link. Structure: two sections, "PDP -
  Details Panel" (above the fold — Product Name, Price, Fabric Selection,
  Quantity, ATC Stack, Gallery, Bread Crumbs, Sticky ATC, Why We Love It,
  Shipping Alert, Product Info Accordion, Value Props, Icon Row, Variant
  Selection, Club TOV, BNPL — mostly Live) and "PDP - Below the Fold" (Get
  the Look, Pairs Well With, Recently Viewed, You May Also Like, Shop the
  Collection, Our Pieces Styled by You, Reviews, Trust Banner — 100% Draft).
  Shay chose to start with Details Panel. **This file is the sole source of
  truth for PDP — not cross-checked against the live site**, which Shay was
  explicit is behind this redesign. First component mapped: **Price**
  ([node 7:20](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=7-20)),
  a composite (price + Affirm financing line + free-shipping message +
  rating + SKU) — distinct from the app's existing simple `Price` atom used
  on PLP/cart, kept separate as a new `PDPPrice` component rather than
  bloated into the same file. The Figma file's own text styles say the font
  is "Gotham" — Shay confirmed that's stale and it's actually Montserrat.
  Verified the green "Includes free shipping*" color (`#327652`) and updated
  `--color-success` to match (was `#2E7D4F`, a rough site-sampled guess).
  PDP components render as `DocSection`s on the single `Pages > PDP` page
  (`/pages/product`), not their own top-level nav section — corrected after
  first giving Price its own `/pdp/price` route, per Shay ("we have a pages
  section that has the pdp page listed there")._
- _2026-09-17 — **Product Name** mapped ([node 1:97](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=1-97)).
  10 Live variants (5 versions × Desktop/Mobile) collapse cleanly to two
  independent flags: an optional grade tag ("Contract Grade" or "Performance
  Fabric," color `Colors/Tertiary/Storm` #3F4B59) and an optional material
  tag ("Genuine Leather," color `Colors/Neutral/700` #777777), both already
  present in the app's 52-color brand palette from the OG sync — just not
  wired as usable Tailwind tokens until now (`--color-storm`,
  `--color-neutral-700` added). Base name uses the existing `font-display`
  (GT Ultra Fine Trial), 38px Desktop / 22px Mobile. The 5 `Viewport=All,
  Status=Draft` variants (one per version) were ignored per the
  Version=/Viewport=/Status= naming convention — unambiguous, no need to ask._
- _2026-09-17 — **Price corrected same-day.** The naming convention marked
  node 7:20 "Status=Live," but Shay flagged directly that this specific
  component (with its Affirm financing line, shipping message, and SKU) was
  actually the old, not-live one — a case where the Live/Draft naming itself
  was wrong, not just ambiguous. Real component confirmed by Shay selecting
  it in Figma: [node 755:8551](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=755-8551)
  (previously read as the "Mobile" variant of the old Price). The actual
  design: price on the left, a single star + numeric rating + review count
  on the right (Rouge `#B15A63`, the review count underlined like a link) —
  **one universal layout for every device**, not separate Desktop/Mobile
  versions. Rebuilt `PDPPrice` to just this; dropped `monthlyEstimate`,
  `sku`, `freeShipping`, and `compact` entirely. Reverted `--color-success`
  back to `#2E7D4F` — it had been updated to `#327652` on the strength of
  the now-stale shipping message, which no longer justifies the change.
  **Follow-up same day:** initial rebuild missed that the rating sits in its
  own pill badge, not bare text — pixel-sampling the screenshot alone gave
  an ambiguous, slightly-off background tone, so switched to reading the
  actual node properties directly (`Frame 1262`): fill is `Rouge` (`#B15A63`)
  at 10% opacity, 4px corner radius, 12px/6px padding, 1px gap between the
  star and the number, 5px gap before "reviews." Lesson: prefer exact
  property extraction over pixel-sampling when a screenshot alone leaves the
  exact color/shape ambiguous — see project memory._
- _2026-09-17 — **Fabric Selection** mapped. Component set has 3 Live
  versions ("Swatch" ×2 viewports, "Fabric Selection" ×1) plus 3 Draft — two
  different Live "looks" for what reads as the same component, a genuine
  ambiguity worth asking about rather than guessing. Shay confirmed: use
  "Swatch," and on this component "Viewport=All" actually means **Mobile**
  (not "universal" as assumed elsewhere) — [node 562:6594](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=562-6594)
  is Mobile, [node 962:7448](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=962-7448)
  is Desktop; only difference is a "View Fabric Details" link, Mobile only.
  Also resolved without asking further: the one Draft variant, "Swatch
  Selected," turned out unnecessary — inspecting the Live "Swatch" node
  directly showed swatch #2 already has a `tick-circle` icon overlay (no
  border ring) while the other swatches show a thin border ring instead;
  both the selected and unselected states are real, already-Live content in
  the same component. Built `PDPFabricSelection` (fabric name + swatch row +
  optional "View Fabric Details" link)._
- _2026-09-17 — **Batch mapping pass, per Shay's upfront notes** (she
  specified the exact node for each component before I started, resolving
  ambiguity in advance rather than one at a time):
  - **Quantity** ([node 15:5671](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=15-5671),
    "Viewport=All" — genuinely universal here, unlike Fabric Selection).
    Stepper pill background is `Not black` at 7% opacity, not a flat gray —
    found by checking the actual paint object's `opacity`, not just its hex.
  - **ATC Stack** — all 3 Live variants included per Shay (ATC, ATC-PO,
    ATC-Wishlist Pressed) — [node 13:144](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=13-144).
    The wishlist circle is TOV Pink with a charcoal border in *both* the
    default and "pressed" states — only the heart icon's fill (outline vs.
    solid) actually changes; the circle background does not, despite
    looking whiter in the smaller screenshot.
  - **Sticky ATC** — only "Version=Fixed ATC, Viewport=Mobile, Status=Live"
    ([node 13:193](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=13-193)),
    per Shay, not the other 3 similar Live "Fixed ATC-*" variants in the
    same component set. Quantity stepper + "Add to cart - $price" button,
    both with a drop shadow (floating bar).
  - **Why We Love It** ([node 582:9579](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=582-9579),
    universal per Shay). Another stale-label case: the component is named
    "Why We Love It" but displays "Why You'll Love It." New icon extracted:
    `hearts-floating`.
  - **Shipping Alert** — all 6 Live variants, "labeled properly" per Shay's
    request rather than using Figma's own variant names, which are actively
    misleading here: "PO" (no "EST" suffix) is the one *with* a restock-date
    estimate, "PO-EST" is the one *without* — the opposite of what the names
    suggest. Confirmed real, Live green (`#1FC16B`) — updated
    `--color-success` again (was `#2E7D4F`, then briefly `#327652` from the
    now-corrected Price component, now this). No icon on any variant,
    contrary to an initial mis-scan that appeared to reference one.
  - **Value Props** — "Version=Value Props Updated" specifically ([node
    813:8358](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=813-8358)),
    per Shay, universal. 3 new icons extracted: `delivery-box`, `box-remove`,
    `truck-schedule` (all came through `download_assets` with export-level
    bloat/wrong-background artifacts again — this time via nested-instance
    IDs that `download_assets` can't target directly, resolved by walking up
    to each icon's real main component via `getMainComponentAsync()`).
  - **Variant Selection** — all 4 variants included per Shay even though
    *none* are Live yet ([node 197:990](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=197-990)).
    One reusable label + pill-row pattern, demonstrated with 2 example
    option sets (Size, Fill Type) each shown unselected/selected. Selected
    state: `Not black` at 7% opacity fill + solid `Not black` border;
    unselected: flat `#E8E8E8`, no distinct border.
  - **Club TOV** — Desktop uses "Version=Default, Viewport=All, Status=Draft"
    ([node 105:793](https://www.figma.com/design/ySZYmjbO2Wck8u1JGAtI5J?node-id=105-793)),
    Mobile uses "Version=Club TOV, Viewport=Mobile, Status=Draft" (node
    813:8190), per Shay. New icon: `trophy`. (Corrected below: the two
    aren't visually identical after all.)
  - **Icon Row** — explicitly excluded per Shay ("Do not include"); removed
    from the "not yet mapped" list entirely, not just left unbuilt.
- _2026-09-17 — **Design corrections, all from re-checking Figma specs
  directly per Shay's review** (this batch mapping pass had several real
  mistakes, not just ambiguity):
  - **Fabric Selection**: had the selected/unselected swatch logic
    backwards, plus a stray tick-circle overlay that shouldn't exist at
    all. Corrected: unselected = light (`#E8E8E8`) border ring, selected =
    darker (charcoal) border ring, no icon overlay ever.
  - **Quantity / Sticky ATC**: the minus/plus icons were the generic
    General-UI `minus`/`add` icons (which carry a visible background),
    not the real "Subtract_round"/"Add_round" glyphs Figma actually uses —
    those are bare 2px stroke lines with no circle or background at all.
    Extracted the real ones (`quantity-minus.svg`, `quantity-plus.svg`).
  - **ATC Stack**: the default (non-liked) wishlist circle's pink fill
    is real in the paint data, but its `visible` flag is `false` — I'd
    only checked the paint's color, not whether it was actually switched
    on. Default is charcoal-outline only, no pink. Also replaced the
    hand-approximated heart path with the real extracted vector (the
    approximation's own internal padding made it read as too small even
    at a correct bounding-box size).
  - **Why We Love It**: the outer card needs a white background + `#E8E8E8`
    border — I'd left it as bare content with no card at all. Description
    box is `#E8E8E8` at 31% opacity, not solid. Renamed the doc section to
    "Why You'll Love It" (the real displayed text) instead of the stale
    Figma component name "Why We Love It."
  - **Shipping Alert**: missed the actual background entirely — each
    variant has a horizontal gradient (white → color at ~49% → white) plus
    a small solid-color status dot before the text. I'd only walked `TEXT`
    nodes for fills, never checked the root component's or a wrapper
    frame's own fill, so the gradient was invisible to my extraction the
    first time. In-Stock variants carry the gradient on the root
    component; Preorder/Low-Stock variants carry it one frame in
    ("Frame 1263") — same visual result, different node.
  - **Value Props**: container padding is 10px horizontal / 4px vertical
    (not a uniform 16px), rows are 7px top/bottom with a 6px icon-to-text
    gap (not 10px/12px) — checked exact node properties instead of
    eyeballing. Separately, the **icon files themselves** (`verified.svg`
    and ~118 others across the whole icon library) still carried leftover
    white-background rects from the original bulk extraction — my earlier
    cleanup regex only matched one specific pattern
    (`<rect fill="#AEAEAE"/>` immediately after `<svg>`) and missed a
    second pattern (multiple nested `fill="white"` rects at varying
    depths). Rewrote the cleanup as a proper script: find each icon's own
    named `<g id="...">` group, extract just its balanced contents, discard
    everything else. Fixed all 119 affected files across the whole
    `public/icons/` library, not just the ones this component uses —
    verified by re-rendering the full Iconography page.
  - **Club TOV**: assumed Desktop and Mobile were visually identical from
    small screenshots — they're not. Mobile is meaningfully more compact
    (12px text, 8px/4px padding vs. Desktop's 16px text, 20px/14px
    padding). Added a `compact` prop and a Mobile example._

- **2026-09-17 — Gallery, Bread Crumbs, BNPL mapped.** Continuing "PDP -
  Details Panel":
  - **Gallery** (node 15:348 Desktop, 15:349 Mobile) — standalone
    components, not a Version=/Viewport=/Status= set, so both included
    as-is. Desktop: a vertical thumbnail rail (9 image tiles + a 10th
    non-photo tile with a real extracted "dimensions" ruler icon, cream
    background) beside a large main image carrying the New Arrival badge
    and two carousel arrow buttons (38x38, white/79% opacity,
    `#bbbbbb` border, `cornerRadius: 6` — a rounded square, not a full
    circle, per the node data). Below that, a full-width 5-up icon+text
    strip — but its labels are Figma's own placeholder copy ("Icon text /
    2 lines"), not real content, so it's built with existing Info icons
    (warranty, care, in-room, install, sustainable) instead of inventing
    copy. Mobile: single main image with the New Arrival badge, a
    heart+count wishlist pill (reuses the ATC Stack heart glyph, same
    stroke-only unliked style) top-right, 8-dot pagination (2nd dot
    active) bottom-center, and a horizontal thumbnail strip below.
  - **Bread Crumbs** (node 582:11812) — universal, standalone. Content is
    Figma's own template placeholder ("Menu Item",
    "[Prod Name] TOV-000000") — reproduced as-is rather than invented.
    The home icon is a distinct, smaller/lighter glyph
    (11.98x12.15, `#777777`/neutral-700, 0.9375px stroke) from the
    General UI library's "home" icon (24x24, `#363538`, 1.5px stroke) —
    inlined directly instead of reusing the wrong-colored library asset.
  - **BNPL** (node 838:8555) — a real 2-variant Live set (Mobile,
    Desktop), unlike most of this file's ambiguous naming. Desktop is
    simply a larger rendering of the same content and layout (14px copy
    vs. 12px, larger logo lockup) — not a copy/layout difference like Club
    TOV's `compact` mode. Klarna, Afterpay, and Affirm are real extracted
    logo images (`public/brand/payment/`); Shop Pay is a real extracted
    vector (bolt + wordmark, `#5433EB`) — none are generic stand-ins.
  - **Product Info Accordion** (node 13:366) — held back. All 6 variants
    are `Status=Draft`, and unlike Variant Selection/Club TOV (draft but a
    clear single reusable pattern), there is no `Viewport=Mobile` variant
    at all — every variant is Desktop-only. This is a different kind of
    ambiguity than "which one is live," so flagged for Shay rather than
    assumed.

- **2026-09-21 — Product Info Accordion mapped, all 6 Draft variants.**
  Shay's call on the held-back item above: include all 6 anyway. Once
  extracted, the 6 "variants" turned out not to be 6 competing designs —
  they're the same 3-row accordion (Details / Dimensions / Care) shown
  with a different row expanded and genuinely different, product-specific
  content each time:
  - **Default** (13:365) — all 3 rows collapsed.
  - **"Dimensions" (333:2375)** — Dimensions expanded for an accent chair:
    2 measurement diagrams, Overall/Seat/Arm Height/Back Height groups.
  - **"Product Info Accordion 3" (333:2131)** — Dimensions expanded for a
    dresser: 3 diagrams, drawer-by-drawer groups (Top Left & Right, Top
    Center, Bottom Left & Right), a 4-box shipment breakdown.
  - **"...4" (325:6262)** — Dimensions expanded for nesting tables: 3
    diagrams, Large/Medium/Small Table groups (diameter, not depth), its
    own 4-box shipment breakdown.
  - **"...5" (15:89)** — Details expanded, not Dimensions — a bed: comfort
    level selector (Plush/Soft/Medium/Firm), Specifications (SKU, color,
    materials, leg color, weight capacity), Materials, Features (Queen/King
    sizing), Assembly, and a "Download assembly guide" link.
  - **"...6" (13:849)** — Care expanded — an upholstered piece: 3 bullet
    care tips, a "Fabric Care instructions" sub-heading, a full cleaning
    paragraph with cleaning code, and a "View care guide" link.

  Text extraction hit a real bug worth recording: two of variant 6's text
  nodes contain a **U+2028 LINE SEPARATOR** character mid-sentence ("check
  out our⁠ care guide") — invisible in Figma's UI, but it broke the
  `use_figma` MCP transport's JSON-over-SSE parsing every time that string
  was returned, with no indication it was the cause (looked like a size
  limit at first, since two unrelated short strings failed identically).
  Bisected by fetching text nodes one at a time and inspecting char codes
  directly (`charCodeAt`) rather than assuming truncation — future
  extractions should expect stray U+2028/U+2029 in body copy and either
  strip them before returning or fetch suspect strings individually.

  Still not built: a real Mobile design for this component doesn't exist
  yet in Figma — the doc page's callout says so explicitly rather than
  inventing one.

### Cart & Checkout

_not started_

### Account

- **2026-09-29 — canvas created and mapped.** Shay asked for an account page
  in the OG file (`DTjIdCKhnDUVvJhEfpn10v`) that uses the file's own styles
  and components, with its structure based on the live tovfurniture.com
  account. The live account is Shopify's hosted customer account
  (`shopify.com/71109247263/account`), read through Shay's signed-in Chrome
  session:
  - **Layout:** logo + avatar header, a left nav (Home/Orders/Profile/Logout),
    and one column of white rounded cards on a beige background.
  - **Orders:** TOV Points banner, plus a Welcome / Shop now card because
    the account has no orders.
  - **Profile:** name + Edit, Email/Phone, Addresses (empty), a Marketing
    email toggle, then Sign out / Sign out of all devices.
  - Built a new canvas **"👤 Account Components"** (node `1777:1912`, placed
    right after Cart). Its info shell is cloned from the Cart page.
  - 10 component sets, all `Version=/Viewport=/Status=Draft`: Account Button
    - small `1778:6` and Account Toggle `1778:11` (both genuinely new
    primitives), Nav `1778:32`, Points Banner `1778:41`, Welcome Card
    `1778:56`, Order Card `1778:196`, Contact Info `1778:221`, Marketing
    Preferences `1778:236`, Sign Out `1778:245`, Addresses `1778:300`.
  - 6 page layouts that use the real Navbar (`1340:3008` / `1341:3963`),
    Footer (`65:1144` / `65:1196`) and Button - large (`413:4251`) instances.
  - Every color, spacing and radius value is bound to Global Tokens
    variables. Text uses the file's text styles (`H-6 V2`, `H-7 V2`,
    `B-1`…`B-4`).
  - Shay signed off ("This looks good go ahead and map"), and the whole
    canvas was mapped the same day into `src/components/ui/Account.tsx` and
    `/pages/account`.
  - **Known gaps:**
    - Order Card and the Saved address state follow the standard Shopify
      layout. The reference account has no orders or addresses, so neither
      could be verified live.
    - The address icon is the approved General-set `pin` (a pushpin).
    - The live site's envelope icon beside "Email" is left out. The only
      map-marker and envelope icons in the file come from the imported
      generic "UX icons" kit.
    - The full-page layouts use the real site Navbar and Footer in place of
      Shopify's minimal account header and policy-link footer.

### Editorial Pages

- _2026-09-15 — system added (not started in Figma). Code-side stub pages
  created for all 5 page types under `/pages/editorial/*`. Scope: New
  Arrivals, Collections (Landing + Collection Page), TOV Edits (Landing +
  Edit Page) — expected to grow, per Shay._
- **2026-09-23 — New Arrivals: first Figma file for this system identified
  and mapped.** [TOV26 — B2C — New Arrivals Refresh](https://www.figma.com/design/tefhO0Dx4CNYT09diRqfB2/TOV26---B2C---New-Arrivals-Refresh?node-id=1-7)
  (fileKey `tefhO0Dx4CNYT09diRqfB2`), canvas "💠Components" (node `1:7`) →
  `Desktop - Default` (`8005:9839`, 1440×7412) / `Mobile - Default`
  (`8005:9838`, 375×7984). Real structure confirmed via `get_metadata`
  (not assumed from labels): navbar → "New arrivals" heading → 4 repeats of
  [2 product rows (8 cards) + a "Social CTA header" bar + a "Get the Look"
  lifestyle banner] → a "showing X of Y" / load-more block → footer.
  - **Reused as-is (officially synced, no sign-off needed):** the product
    grid is the already-mapped Collection (PLP) `PLPProductRowDesktop`/
    `PLPProductRowMobile` (4/2 `PLPProductCard`s). Figma's own card width
    here (302.5px Desktop / 162.5px Mobile, to fit 4-/2-up in the narrower
    1240px/375px container) is narrower than `PLPProductCard`'s fixed
    342px/167px — same "fixed-pixel-grid doesn't natively fit" situation
    already precedented on Homepage, same fix (horizontally-scrollable rows
    at real intrinsic width) rather than resizing the shared component.
    Product-card badge text varies between "Best Seller · Sale" and "New
    Arrival · Sale" from card to card in the source itself — read as
    placeholder-catalog variety (same convention as `PLPProductCard`'s own
    doc comment), not a meaningful per-card rule. The "load more products"
    CTA reuses the existing `Button` (`primary`/`lg`) rather than a new pill
    button.
  - **New, built but NOT logged as officially synced — pending Shay's
    sign-off per the project's new-component approval rule:** 4 page-specific
    pieces with no existing equivalent elsewhere in the system (Homepage's
    own "Social CTA Header" / "Get the Look" are a different file, different
    content, different layout — not close enough to reuse):
    - **Heading** (node `8001:469` Desktop / `8001:865` Mobile) — bordered
      display-font title.
    - **Social CTA Header** (node `8001:5033` Desktop / `8005:5286` Mobile) —
      a dark (#333) strip. Real content is an image-spec annotation for the
      design team, not finished copy ("Collection [will be the same image as
      LP]: Lifestyle Image | Desktop 1920 x 720" / "Category image:
      Lifestyle Image | Mobile size - can use 474 x 375") — reproduced
      verbatim per the established placeholder-copy convention. Desktop and
      Mobile genuinely differ in font, size, and alignment, not just
      padding — verified with separate lookups on each instance.
    - **Get the Look Banner** (node `8001:586` Desktop / `8001:977` Mobile) —
      full-bleed lifestyle image (Figma's own empty checkered fill) with an
      Eyebrow/Header/Sub copy overlay. Desktop adds a "Get the look" pill CTA
      (real `bag-add` icon approximated with the existing `bag-outline`
      icon, same precedent as Homepage's Social module); Mobile genuinely
      has no CTA button — confirmed absent from its own node tree, not
      dropped by mistake.
    - **Load More** (node `8001:849` Desktop / `8001:1332` Mobile) —
      "showing X of Y" caption + progress bar around the reused Button CTA,
      plus two floating circular icons (chat launcher, back-to-top) that
      read as generic site-wide chrome rather than New-Arrivals-specific
      content — reused existing `chat.svg`/`arrow-up.svg` icons rather than
      exporting new ones. Figma anchors these two at fixed viewport-edge
      pixel offsets (e.g. literal `left: 1291.5px` in a 1440px frame) that
      only make sense pinned to a full browser viewport — laid out as a
      flanking row instead of reproducing those literal offsets.
  - All 4 new pieces live in `src/components/ui/NewArrivalsSections.tsx`,
    clearly commented NEW/UNREVIEWED, and are shown (with an explicit
    unreviewed callout) on the `/pages/editorial/new-arrivals` doc page —
    but deliberately not added to this Sync Log's "officially synced" list
    above or to `COMPONENT_CHANGELOG.md`'s component table, per the same
    "new components need Shay's explicit sign-off" rule already established
    for prompt-to-Figma builds.
- **2026-09-23 — Collection: both the Landing directory and the individual
  collection page mapped, from two separate Figma files, onto the shared
  `/pages/editorial/collection` doc page (per the 2026-09-23 rescope above,
  landing + individual page live together, one nav entry).**
  - **Collections Landing:** [TOV26 — B2C — Explore collections LP](https://www.figma.com/design/oO2Li1XutYUUAgUUs4f3lJ/TOV26---B2C---Explore-collections-LP---1442?node-id=1-5)
    (fileKey `oO2Li1XutYUUAgUUs4f3lJ`), canvas node `1:5` → section
    "Collections LP" (`6052:1798`) → `Explore collections` Desktop
    (`6084:479`, 1440×5283) / Mobile (`6052:1385`, 375×5391.6). Real
    structure confirmed via `get_metadata` (not assumed from labels):
    navbar → heading → 4 repeats of [a full-bleed Collection Banner + a row
    of 4/2 Product Cards] → a "Signature collections" heading + a
    row/2×2-grid of 4 smaller Collection Tiles → footer. A second,
    unrelated section on the same canvas (`6135:1599`, also named
    "Collections LP") was spot-checked (`6135:2379` vs. `6052:1394`, same
    size, same screenshot) and confirmed to be loose duplicate/reference
    frames, not additional real content — not mapped.
    - **Reused as-is (officially synced, no sign-off needed):** the product
      grid is the already-mapped Collection (PLP) `PLPProductRowDesktop`/
      `PLPProductRowMobile`, unchanged — per Shay's explicit direction not
      to fork `PLPProductCard` over this file's round swatch dots, real
      product photography, and lack of a badge pill.
    - **New, built but NOT logged as officially synced — pending Shay's
      sign-off:** `CollectionBanner` (the full-bleed module, node `6084:489`
      Desktop / `6052:1394` Mobile) and `CollectionTile` (the smaller
      "Signature collections" variant, node `6084:699` Desktop /
      `6052:1543` Mobile). Both approximate each collection's own bespoke
      display font (Felix Titling for "Amara", Spectral SC for "Hump"/
      "Marlow" — neither loaded in this project) with the existing
      `font-display` token instead.
    - **Verified content anomalies in the source, reproduced/flagged rather
      than silently corrected:** the "Hump" Desktop banner's title text
      (node `6084:529`) is set to `opacity:0` in Figma — confirmed
      genuinely invisible via screenshot, rendered here with the title
      restored since an unreadable label serves no one. The "Cynthia" and
      "Amara" Desktop banners (`6084:488`/`6097:473`) share the exact same
      background photo (byte-identical file) — the same photo the
      individual-collection-page file uses as Amara's own canonical hero,
      strongly suggesting the Cynthia banner has the wrong/mislabeled photo
      (its own product row directly below it correctly shows real Cynthia
      products). Mobile repeats an apparently-broken banner (opacity-0
      "Amara" title compositing the Cynthia + Hump images, nodes `6052:1429`
      and `6128:1563` — byte-identical to each other) across 2 of its 4
      slots, and its 4th slot shows a visible "Marlow" title paired with
      real Amara products — Marlow never appears paired with its own
      products on Mobile. None of this was normalized into a clean,
      consistent story; see `CollectionsLandingSections.tsx`'s header
      comment and the doc page callout for the full breakdown.
  - **Collection — Individual Page:** [TOV26 — B2C — Collections on TOV](https://www.figma.com/design/9xYNBPcAsKBOCCGP5X6wJ9/TOV26---B2C---Collections-on-TOV---4624?node-id=2159-2814)
    (fileKey `9xYNBPcAsKBOCCGP5X6wJ9`, a **separate** file from Collections
    Landing), canvas node `2159:2814` ("Collections design example") →
    Desktop frame "Colections - D" (`2159:2815`, 1440×7098) / Mobile frame,
    confusingly ALSO named "Colections - D" in the source despite being
    375px wide (`2159:3150`, 375×6021.7) — found only by checking the
    actual node width, a real "never trust labels" case. Real structure:
    navbar → a full-bleed Hero (real photo + collection-specific-font name
    + subtitle + description, all in one banner, no separate Description
    block) → a product grid interleaved with lifestyle image blocks that
    are genuinely empty/unfilled in the source (no photo dropped in yet) →
    a 2-column "[Collection] + you / Shape the Look" masonry gallery + a
    "View more" button → footer. A hidden duplicate hero frame (`2159:2817`)
    was found and compared against the real visible one (`2159:2824`) via
    `get_design_context` on both, rather than assumed empty or trusted —
    confirmed to be an abandoned draft (339px oversized title, mismatched
    centering, a different tint) and excluded.
    - **Reused as-is (officially synced):** the product grid again reuses
      `PLPProductRowDesktop`/`PLPProductRowMobile` unchanged, same rationale
      as above.
    - **New, built but NOT logged as officially synced — pending Shay's
      sign-off:** `CollectionHero` (node `2159:2824` Desktop / `2159:3152`
      Mobile), `CollectionLookbookBlock` (the empty lifestyle-image
      interstitial), and `CollectionShapeTheLook` (the masonry gallery,
      node `2159:3481` — simplified to a uniform 6-cell grid rather than
      the source's 7 cells of varying height, a documented scope
      simplification).
  - All new pieces from both files live in
    `src/components/ui/CollectionsLandingSections.tsx` and
    `src/components/ui/CollectionPageSections.tsx`, clearly commented
    NEW/UNREVIEWED, and are shown (with an explicit unreviewed callout) on
    the shared `/pages/editorial/collection` doc page — not added to this
    Sync Log's "officially synced" list or to `COMPONENT_CHANGELOG.md`'s
    table, per the same sign-off rule.
- **2026-09-23 — TOV Edits: second Figma file for this system identified and
  mapped, from an unlabeled file.** [TOV26 — B2C — TOV Edits](https://www.figma.com/design/PXf8n9b6WW5X5ZkYqiykJH/TOV26---B2C---TOV-Edits---5680?node-id=1-4)
  (fileKey `PXf8n9b6WW5X5ZkYqiykJH`), one page ("👩‍🎨 Design review", node
  `1:6`), canvas node `1:4`. Unlike New Arrivals, nothing in this file is
  labeled with real page names — two frames even share the literal section
  name "Edits - Landing Page design." Which frame was which real page had to
  be identified from actual content (screenshots + `get_design_context`):
  - `8015:1447` (Desktop, 1440×1172) / `8015:1765` (Mobile, 375×2145) — the
    **Directory/Landing page**: navbar → breadcrumb (Home / TOV Edits) →
    "TOV Edits" heading → a 3-up tile grid → footer. Short, grid-shaped, no
    product content.
  - `8023:4971` (Desktop, 1440×4877) / `8023:5028` (Mobile, 375×6934) — an
    **individual Edit's own page**: its breadcrumb reads "Home / TOV Edits /
    The [Name] Edit" (a 3rd crumb level confirms it's a child of the
    directory above), then a hero → 24 (Desktop, 6 rows of 4) / 32 (Mobile,
    16 rows of 2 — the two viewports don't reconcile to the same count in
    this draft file) curated `PLPProductCard`s with one mid-page editorial
    banner breaking up the grid → footer.
  - Two more sections were inspected and ruled **out of scope** (not Edits
    pages themselves): "Edits - Homepage Placements" (`8023:7286`, a
    Homepage mockup with an embedded Edits teaser) and "Marketing Module"
    (`8032:12183`, a small single-Edit cross-sell promo card with different
    copy from either page above). The file's "Edits - Components" section
    (`8001:1886`) holds isolated 2-tile/3-tile variants of the Directory
    grid tile — read as "supports 2 or 3 Edits," not a separate page.
  - **Reused as-is (officially synced, no sign-off needed):** the individual
    page's product grid is the already-mapped Collection (PLP)
    `PLPProductRowDesktop`/`PLPProductRowMobile` — verified pixel-identical
    to this file's own "Product card" instances (badge/price/swatch shape
    all match, unlike New Arrivals' narrower cards). The individual page's
    breadcrumb reuses the already-mapped, already-synced `PDPBreadCrumbs`
    as-is (pixel-identical: 15px home icon, 10px Montserrat #777, 0.5px/10px
    dot separators).
  - **New, built but NOT logged as officially synced — pending Shay's
    sign-off:** the Directory page's Heading and Tile Grid, the Directory
    page's own (shorter, 2-segment) breadcrumb variant, the individual
    page's Hero, and its mid-page "The finishing touches." editorial banner
    — all new assembled patterns with no existing equivalent. The banner is
    structurally similar to New Arrivals' own unreviewed
    `NewArrivalsGetTheLookBanner` (same bag-add→bag-outline.svg icon
    approximation) but kept as a separate component per that file's own
    precedent of not cross-reusing visually-similar banners between
    different Figma files. All 4 live in
    `src/components/ui/TovEditsSections.tsx`, clearly commented
    NEW/UNREVIEWED, and shown (with an explicit unreviewed callout) on the
    `/pages/editorial/tov-edits` doc page.
