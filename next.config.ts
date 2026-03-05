import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "powerbug.eu",
      },
      {
        protocol: "https",
        hostname: "powerbug.co.uk",
      },
    ],
  },
};

export default nextConfig;
