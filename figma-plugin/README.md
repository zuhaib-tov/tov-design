# TOV — Push Images (Figma plugin)

Finishes the "Push to Figma" step from the design system app. Someone
uploads an image, assigns it to a slot, and clicks Push to Figma on the
site — that only *queues* the request, since Figma has no write REST API.
This plugin is what actually places the image, running inside Figma
itself.

Works identically in every TOV Figma file (A+ Content, Amazon Store, or
any future one) — it only asks the app for what's pending *for the file
it's currently running in*, matched by the file's name against
`KNOWN_FILES` in `src/code.ts`. (`figma.fileKey` would have been the
obvious way to do this, but it's gated behind `enablePrivatePluginApi` —
only registered private/org plugins can use it, not a plain
locally-imported dev plugin like this one.) **Adding a new Figma file to
the app means adding it to `KNOWN_FILES` too** — one line, its name
prefix and the fileKey used when its slots were set up in
`src/lib/amazon/figma-slots.ts` — then rebuild (see below).

## Who needs this

Only whoever runs it needs Figma edit access (a paid/editor seat — a free
viewer account can't place content into a file). Uploading images and
clicking "Push to Figma" on the app doesn't require Figma access at all —
that's a separate step anyone on the team can do.

## One-time setup (per person running it)

1. Open the **Figma desktop app** (plugin import isn't available in the
   browser version).
2. Get this repo onto your machine (clone it, or just grab the
   `figma-plugin/` folder).
3. In Figma: **Menu → Plugins → Development → Import plugin from
   manifest…**
4. Select `figma-plugin/manifest.json` from this folder.

That's it — the plugin now shows up under **Plugins → Development → TOV —
Push Images** in every file you open, not just one.

## Using it

1. Open the Figma file you want to update (A+ Content or Amazon Store).
2. Run the plugin from the Plugins menu (or right-click the canvas →
   Plugins → Development → TOV — Push Images).
3. It checks automatically on open and lists what it placed or skipped.
   Click **Check again** to re-run without reopening the plugin — useful
   if you just clicked Push to Figma on the site and want it to land
   immediately.

Each result line is either green (placed) or red (skipped, with why —
e.g. a broken source upload, same "Broken — Re-upload" case the app's own
uploader flags).

## Making changes to the plugin

The plugin runs compiled JavaScript (`code.js`), not the TypeScript
source directly — Figma can't load `.ts` files. After editing
`src/code.ts`:

```bash
cd figma-plugin
npm install   # first time only
npm run build
```

Commit the regenerated `code.js` along with your source change — anyone
who already imported the plugin picks up the update automatically next
time they run it (no re-import needed, since Figma reads the file fresh
from disk each run).

`npm run watch` rebuilds on every save while you're actively working on
it. `npm run typecheck` checks types without emitting anything.
