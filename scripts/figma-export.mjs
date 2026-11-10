// Exports Figma nodes as image files, for syncing real imagery into /public.
//
// Usage (from the repo root; reads FIGMA_TOKEN from .env.local without printing it):
//   node --env-file=.env.local scripts/figma-export.mjs <fileKey> <outDir> <format> <scale> <name=nodeId> [<name=nodeId> ...]
//
// Example:
//   node --env-file=.env.local scripts/figma-export.mjs DTjIdCKhnDUVvJhEfpn10v public/images/homepage/hero jpg 1 hero=1063:2001
//
// Formats: jpg, png, svg, webp is not offered by Figma, convert separately if needed.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const [fileKey, outDir, format, scale, ...pairs] = process.argv.slice(2);
if (!fileKey || !outDir || !format || !scale || pairs.length === 0) {
  console.error("usage: figma-export.mjs <fileKey> <outDir> <format> <scale> <name=nodeId>...");
  process.exit(1);
}
const token = process.env.FIGMA_TOKEN;
if (!token) {
  console.error("FIGMA_TOKEN is not set (expected in .env.local)");
  process.exit(1);
}

const items = pairs.map((p) => {
  const i = p.indexOf("=");
  return { name: p.slice(0, i), id: p.slice(i + 1).replace("-", ":") };
});

await mkdir(outDir, { recursive: true });
const ids = items.map((i) => i.id).join(",");
const url = `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(ids)}&format=${format}&scale=${scale}`;

let res;
for (let attempt = 0; attempt < 5; attempt++) {
  res = await fetch(url, { headers: { "X-Figma-Token": token } });
  if (res.status !== 429) break;
  const wait = Number(res.headers.get("retry-after")) || 2 ** attempt * 3;
  await new Promise((r) => setTimeout(r, wait * 1000));
}
if (!res.ok) {
  console.error(`Figma images request failed: ${res.status}`);
  process.exit(1);
}
const { images, err } = await res.json();
if (err) {
  console.error(`Figma error: ${err}`);
  process.exit(1);
}

for (const { name, id } of items) {
  const src = images[id];
  if (!src) {
    console.error(`no image returned for ${name} (${id})`);
    continue;
  }
  const img = await fetch(src);
  const buf = Buffer.from(await img.arrayBuffer());
  const file = path.join(outDir, `${name}.${format}`);
  await writeFile(file, buf);
  console.log(`${file}  ${(buf.length / 1024).toFixed(0)} KB`);
}
