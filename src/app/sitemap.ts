import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getSitemapEntries } from "@/lib/sitemap-urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return getSitemapEntries().map((entry) => ({
    url: entry.path === "/" ? SITE.url : `${SITE.url}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(entry.path === "/"
      ? { images: [`${SITE.url}/opengraph-image`] }
      : {}),
  }));
}
