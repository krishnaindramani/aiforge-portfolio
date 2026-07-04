import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Keeps ignoring type errors during build if needed
    ignoreBuildErrors: true,
  },
};

export default nextConfig;