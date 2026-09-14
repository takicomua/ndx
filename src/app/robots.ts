import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { shouldNoIndex } from "@/lib/security";

/** AI-training crawlers already blocked at Cloudflare; mirrored here on purpose. */
const AI_TRAINING_AGENTS = [
  "GPTBot",
  "Google-Extended",
  "ClaudeBot",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "meta-externalagent",
] as const;

export default function robots(): MetadataRoute.Robots {
  if (shouldNoIndex()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
      {
        userAgent: [...AI_TRAINING_AGENTS],
        disallow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
