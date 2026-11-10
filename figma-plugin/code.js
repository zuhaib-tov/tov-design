"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // src/code.ts
  var APP_BASE = "https://tov-design-system.vercel.app";
  function withBypassHeaders(init) {
    return __spreadProps(__spreadValues({}, init), {
      headers: __spreadValues(__spreadValues({}, init == null ? void 0 : init.headers), "" ? { "x-vercel-protection-bypass": "" } : {})
    });
  }
  var KNOWN_FILES = [
    { namePrefix: "TOV26 - Amazon - Premium A+ content", fileKey: "P6ISgCbxCzraEqRtTr0j3P" },
    { namePrefix: "TOV25 - B2C - Amazon store", fileKey: "I95mnwwaoq0CvJOGop9tfn" }
  ];
  function resolveFileKey() {
    var _a;
    return (_a = KNOWN_FILES.find((f) => figma.root.name.startsWith(f.namePrefix))) == null ? void 0 : _a.fileKey;
  }
  figma.showUI(__html__, { width: 360, height: 420 });
  function isLikelyImage(bytes, contentType) {
    if (contentType && contentType.startsWith("image/")) return true;
    if (bytes.length < 4) return false;
    const isJpeg = bytes[0] === 255 && bytes[1] === 216;
    const isPng = bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71;
    return isJpeg || isPng;
  }
  async function fetchPending(fileKey) {
    var _a;
    const res = await fetch(
      `${APP_BASE}/api/assets/figma-pending?fileKey=${fileKey}`,
      withBypassHeaders({ cache: "no-store" })
    );
    if (!res.ok) throw new Error(`Couldn't reach the app (${res.status})`);
    const data = await res.json();
    return (_a = data.pending) != null ? _a : [];
  }
  async function markPushed(id) {
    await fetch(
      `${APP_BASE}/api/assets/figma-push`,
      withBypassHeaders({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete", ids: [id] })
      })
    );
  }
  async function placeOne(item) {
    try {
      return await placeOneUnsafe(item);
    } catch (err) {
      return { ok: false, message: `${item.originalName}: unexpected error \u2014 ${err.message}` };
    }
  }
  async function placeOneUnsafe(item) {
    var _a, _b, _c, _d, _e;
    if (!((_a = item.nodeIds) == null ? void 0 : _a.length)) {
      return { ok: false, message: `${item.originalName}: no target node on record` };
    }
    const res = await fetch(`${APP_BASE}${item.imageUrl}`, withBypassHeaders({ cache: "no-store" }));
    if (!res.ok) {
      return { ok: false, message: `${item.originalName}: source image unreachable (${res.status})` };
    }
    const contentType = (_d = (_c = (_b = res.headers) == null ? void 0 : _b.get) == null ? void 0 : _c.call(_b, "content-type")) != null ? _d : null;
    const buffer = await res.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    if (!isLikelyImage(bytes, contentType)) {
      return { ok: false, message: `${item.originalName}: response wasn't actually an image \u2014 skipped` };
    }
    let image;
    try {
      image = figma.createImage(bytes);
    } catch (err) {
      return { ok: false, message: `${item.originalName}: Figma rejected the image (${err.message})` };
    }
    const missingNodes = [];
    for (const nodeId of item.nodeIds) {
      const node = await figma.getNodeByIdAsync(nodeId);
      if (!node || !("fills" in node)) {
        missingNodes.push(nodeId);
        continue;
      }
      node.fills = [
        { type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" }
      ];
    }
    if (missingNodes.length === item.nodeIds.length) {
      return { ok: false, message: `${item.originalName}: none of its target nodes exist in this file` };
    }
    await markPushed(item.id);
    const label = (_e = item.label) != null ? _e : item.originalName;
    return missingNodes.length ? { ok: true, message: `${label}: placed (${missingNodes.length} of ${item.nodeIds.length} nodes missing)` } : { ok: true, message: `${label}: placed` };
  }
  async function runSweep() {
    const fileKey = resolveFileKey();
    figma.ui.postMessage({
      type: "debug",
      text: `File: "${figma.root.name}" \xB7 resolved fileKey: ${fileKey != null ? fileKey : "(no match in KNOWN_FILES)"}`
    });
    if (!fileKey) {
      figma.ui.postMessage({
        type: "error",
        text: `This file isn't in the plugin's known list (see KNOWN_FILES in code.ts). File name: "${figma.root.name}"`
      });
      return;
    }
    figma.ui.postMessage({ type: "status", text: "Checking for pending pushes\u2026" });
    let pending;
    try {
      pending = await fetchPending(fileKey);
    } catch (err) {
      figma.ui.postMessage({ type: "error", text: err.message });
      return;
    }
    if (pending.length === 0) {
      figma.ui.postMessage({ type: "done", results: [], text: "Nothing pending for this file." });
      return;
    }
    figma.ui.postMessage({ type: "status", text: `Placing ${pending.length} image(s)\u2026` });
    const results = [];
    for (const item of pending) {
      results.push(await placeOne(item));
    }
    const okCount = results.filter((r) => r.ok).length;
    figma.ui.postMessage({
      type: "done",
      results,
      text: `${okCount} of ${pending.length} placed.`
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
})();
