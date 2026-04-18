import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    Phase: process.env.Phase,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY,
  },
   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
   reactStrictMode: true,
   images: {
    unoptimized: true, // ✅ Disable Image Optimization
  },
};

export default nextConfig;
