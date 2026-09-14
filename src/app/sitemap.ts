import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, SITE } from "@/lib/constants";
import { getSitemapEntries } from "@/lib/sitemap-urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${CONTENT_UPDATED}T00:00:00.000Z`);
  return getSitemapEntries().map((entry) => ({
    url: entry.path === "/" ? SITE.url : `${SITE.url}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(entry.path === "/"
      ? { images: [`${SITE.url}/opengraph-image`] }
      : {}),
  }));
}
