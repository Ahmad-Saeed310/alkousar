import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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