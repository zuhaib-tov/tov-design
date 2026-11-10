/**
 * TOV — Push Images. Runs inside a specific Figma file, finds everything
 * queued for THAT file via the "Push to Figma" button on the design
 * system app, places each image, and marks it done.
 *
 * This mirrors exactly what an assisted Claude session did by hand all
 * session: fetch the image, verify it's actually a real image (not a
 * dead/broken blob — see the app's own upload-client.ts for why that
 * check matters), set it as a fill on every target node, then report
 * back that it's pushed. One failed item never blocks the rest.
 *
 * File identification: figma.fileKey looked like the obvious way to know
 * which file this is running in, but it's gated behind
 * enablePrivatePluginApi — only available to registered private/org
 * plugins, not a plain locally-imported dev plugin (confirmed against
 * @figma/plugin-typings' own doc comment on the property, after this
 * silently returned undefined in real use and made every request look
 * like it had nothing pending). figma.root.name has no such restriction,
 * so file identity is matched by name instead — see KNOWN_FILES below.
 * Add a new file there (name prefix -> the fileKey used when its slots
 * were assigned in src/lib/amazon/figma-slots.ts) whenever a new Figma
 * file gets wired up to the app.
 */

const APP_BASE = "https://tov-design-system.vercel.app";

// Baked in at build time from figma-plugin/.env.local by build.js — never
// typed into a Claude session. The app's production deployment is kept
// behind Vercel Deployment Protection on purpose (Shay: keep bots/randoms
// out), so every request this plugin makes needs to carry Vercel's
// "Protection Bypass for Automation" secret to get through.
declare const PROTECTION_BYPASS_SECRET: string;

function withBypassHeaders(init?: RequestInit): RequestInit {
  return {
    ...init,
    headers: {
      ...(init?.headers as Record<string, string> | undefined),
      ...(PROTECTION_BYPASS_SECRET
        ? { "x-vercel-protection-bypass": PROTECTION_BYPASS_SECRET }
        : {}),
    },
  };
}

const KNOWN_FILES: { namePrefix: string; fileKey: string }[] = [
  { namePrefix: "TOV26 - Amazon - Premium A+ content", fileKey: "P6ISgCbxCzraEqRtTr0j3P" },
  { namePrefix: "TOV25 - B2C - Amazon store", fileKey: "I95mnwwaoq0CvJOGop9tfn" },
];

function resolveFileKey(): string | undefined {
  return KNOWN_FILES.find((f) => figma.root.name.startsWith(f.namePrefix))?.fileKey;
}

interface PendingItem {
  id: string;
  label: string | undefined;
  nodeIds: string[] | undefined;
  imageUrl: string;
  originalName: string;
}

figma.showUI(__html__, { width: 360, height: 420 });

function isLikelyImage(bytes: Uint8Array, contentType: string | null): boolean {
  if (contentType && contentType.startsWith("image/")) return true;
  // Magic-byte fallback in case the server didn't send a clean content-type.
  if (bytes.length < 4) return false;
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  return isJpeg || isPng;
}

async function fetchPending(fileKey: string): Promise<PendingItem[]> {
  const res = await fetch(
    `${APP_BASE}/api/assets/figma-pending?fileKey=${fileKey}`,
    withBypassHeaders({ cache: "no-store" })
  );
  if (!res.ok) throw new Error(`Couldn't reach the app (${res.status})`);
  const data = await res.json();
  return data.pending ?? [];
}

async function markPushed(id: string): Promise<void> {
  await fetch(
    `${APP_BASE}/api/assets/figma-push`,
    withBypassHeaders({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "complete", ids: [id] }),
    })
  );
}

async function placeOne(item: PendingItem): Promise<{ ok: boolean; message: string }> {
  try {
    return await placeOneUnsafe(item);
  } catch (err) {
    // Belt-and-suspenders: the sandbox has already shown one Web API gap
    // (Headers.get) we didn't anticipate. Anything else unexpected should
    // degrade to a skipped item with a visible reason, never an unhandled
    // rejection that leaves the whole sweep silently stuck.
    return { ok: false, message: `${item.originalName}: unexpected error — ${(err as Error).message}` };
  }
}

async function placeOneUnsafe(item: PendingItem): Promise<{ ok: boolean; message: string }> {
  if (!item.nodeIds?.length) {
    return { ok: false, message: `${item.originalName}: no target node on record` };
  }

  const res = await fetch(`${APP_BASE}${item.imageUrl}`, withBypassHeaders({ cache: "no-store" }));
  if (!res.ok) {
    return { ok: false, message: `${item.originalName}: source image unreachable (${res.status})` };
  }
  // Figma's plugin-sandbox fetch doesn't reliably support the full Headers
  // API (res.headers.get threw "cannot read property 'get' of undefined"
  // in real use, hanging placeOne with an unhandled rejection) — read it
  // defensively and lean on the magic-byte check as the real verification.
  const contentType = res.headers?.get?.("content-type") ?? null;
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  if (!isLikelyImage(bytes, contentType)) {
    return { ok: false, message: `${item.originalName}: response wasn't actually an image — skipped` };
  }

  let image;
  try {
    image = figma.createImage(bytes);
  } catch (err) {
    return { ok: false, message: `${item.originalName}: Figma rejected the image (${(err as Error).message})` };
  }

  const missingNodes: string[] = [];
  for (const nodeId of item.nodeIds) {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (!node || !("fills" in node)) {
      missingNodes.push(nodeId);
      continue;
    }
    (node as GeometryMixin).fills = [
      { type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" },
    ];
  }

  if (missingNodes.length === item.nodeIds.length) {
    return { ok: false, message: `${item.originalName}: none of its target nodes exist in this file` };
  }

  await markPushed(item.id);
  const label = item.label ?? item.originalName;
  return missingNodes.length
    ? { ok: true, message: `${label}: placed (${missingNodes.length} of ${item.nodeIds.length} nodes missing)` }
    : { ok: true, message: `${label}: placed` };
}

async function runSweep() {
  const fileKey = resolveFileKey();
  figma.ui.postMessage({
    type: "debug",
    text: `File: "${figma.root.name}" · resolved fileKey: ${fileKey ?? "(no match in KNOWN_FILES)"}`,
  });

  if (!fileKey) {
    figma.ui.postMessage({
      type: "error",
      text: `This file isn't in the plugin's known list (see KNOWN_FILES in code.ts). File name: "${figma.root.name}"`,
    });
    return;
  }

  figma.ui.postMessage({ type: "status", text: "Checking for pending pushes…" });
  let pending: PendingItem[];
  try {
    pending = await fetchPending(fileKey);
  } catch (err) {
    figma.ui.postMessage({ type: "error", text: (err as Error).message });
    return;
  }

  if (pending.length === 0) {
    figma.ui.postMessage({ type: "done", results: [], text: "Nothing pending for this file." });
    return;
  }

  figma.ui.postMessage({ type: "status", text: `Placing ${pending.length} image(s)…` });
  const results: { ok: boolean; message: string }[] = [];
  for (const item of pending) {
    results.push(await placeOne(item));
  }

  const okCount = results.filter((r) => r.ok).length;
  figma.ui.postMessage({
    type: "done",
    results,
    text: `${okCount} of ${pending.length} placed.`,
  });
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "run") {
    runSweep();
  }
  if (msg.type === "close") {
    figma.closePlugin();
  }
};

runSweep();
