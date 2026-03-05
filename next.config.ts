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
      {
        protocol: "https",
        hostname: "www.powerbug.com.au",
      },
    ],
  },
};

export default nextConfig;
