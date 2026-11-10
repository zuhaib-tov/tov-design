import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder SVGs (public/placeholders) — swap for your real CDN
    // (Shopify's cdn.shopify.com, Figma exports, etc.) as domains are added.
    dangerouslyAllowSVG: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
