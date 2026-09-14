import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { shouldNoIndex } from "@/lib/security";

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
        allow: ["/", "/poslugy", "/keysy", "/blog", "/.well-known/", "/llms.txt"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/poslugy", "/keysy", "/blog"],
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
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
