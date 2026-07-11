import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jkgbaibsyypetxlvmoqi.supabase.co",
      },
    ],
  },
};

export default nextConfig;

