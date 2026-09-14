import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo-helpers";

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE.mark} · ${SITE.brand}`,
} as const;

function displayTitle(title: string, path: string) {
  if (path === "/" || title === SITE.title) return SITE.title;
  return `${title} | NDX · ${SITE.brand}`;
}

/** Full title / description / canonical / OG / Twitter for a public page.
 *  Next.js overwrites nested `openGraph` and `twitter` objects (does not merge),
 *  so every leaf page must set images + locale itself.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = displayTitle(title, path);

  return {
    title: path === "/" ? { absolute: SITE.title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "uk-UA": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type,
      locale: "uk_UA",
      siteName: "NDX",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/twitter-image"],
    },
  };
}
