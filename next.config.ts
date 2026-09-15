import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  async redirects() {
    // Query string (?type=, UTM, gclid, …) is passed through by Next.js.
    return [
      {
        source: "/brief",
        destination: "/zayavka",
        permanent: true, // 308
      },
      {
        source: "/brief/",
        destination: "/zayavka",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(),
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isProd
              ? "public, max-age=31536000, immutable"
              : "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
