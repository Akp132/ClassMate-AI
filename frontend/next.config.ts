import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:5000"]
    }
  }
};

export default nextConfig;