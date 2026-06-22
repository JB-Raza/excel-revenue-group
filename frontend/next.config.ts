import type { NextConfig } from "next";

// Static export inlines NEXT_PUBLIC_* at build time — log during Vercel builds for debugging.
if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  console.log("[build] Firebase env: OK");
} else {
  console.warn(
    "[build] Firebase env: MISSING — set NEXT_PUBLIC_FIREBASE_* on Vercel and redeploy",
  );
}

const nextConfig: NextConfig = {
  // No `output: "export"` — running as a standard Next.js app on Vercel so that
  // next/image optimization (AVIF/WebP, responsive resizing, lazy loading) is enabled.
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,
  turbopack: {},
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
