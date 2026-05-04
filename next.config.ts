import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker/VM deployments
  output: "standalone",
  // Allow connections from any host (needed for Hetzner/reverse proxy)
  experimental: {
    // Next.js 16 might not need this, but keeping compatibility
  },
};

export default nextConfig;
