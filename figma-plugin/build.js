const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

/**
 * The plugin needs to send Vercel's "Protection Bypass for Automation"
 * secret with every request, since the site is intentionally kept behind
 * Deployment Protection for everyone else (Shay: "I don't want it just
 * out there accessible to bots and everything").
 *
 * The secret is read from a local, gitignored .env.local file — never
 * typed into chat, never seen by Claude — and baked into code.js at build
 * time via esbuild's `define`. code.js itself IS committed (Figma reads
 * it straight from disk), so the secret does end up in plaintext in that
 * one build artifact — an accepted tradeoff for a private repo, same one
 * already flagged for the plugin generally, not a new exposure from this
 * approach specifically.
 */
const envPath = path.join(__dirname, ".env.local");
let bypassSecret = "";
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  const match = content.match(/PROTECTION_BYPASS_SECRET=(.+)/);
  if (match) bypassSecret = match[1].trim();
}

const watch = process.argv.includes("--watch");

async function run() {
  const ctx = await esbuild.context({
    entryPoints: ["src/code.ts"],
    bundle: true,
    outfile: "code.js",
    target: "es2017",
    define: {
      PROTECTION_BYPASS_SECRET: JSON.stringify(bypassSecret),
    },
  });

  if (watch) {
    await ctx.watch();
    console.log("Watching for changes...");
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log(
      "Built code.js" +
        (bypassSecret
          ? " (with bypass secret)"
          : " — WARNING: figma-plugin/.env.local not found or missing PROTECTION_BYPASS_SECRET, built without it")
    );
  }
}

run();
