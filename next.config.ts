import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Allow images from Netlify and Vercel hosted projects
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.netlify.app",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;