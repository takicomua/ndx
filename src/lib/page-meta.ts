import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo-helpers";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative OG image. Default: site OG. */
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

/**
 * Per-page metadata with correct OG/Twitter/canonical.
 * Root layout defaults alone inherit homepage URL/title — always use this on inner pages.
 * Homepage uses this helper plus `title: { absolute }` so the layout template is not applied.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  type = "website",
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "uk-UA": url },
    },
    openGraph: {
      title,
      description,
      type,
      locale: "uk_UA",
      url,
      siteName: "NDX",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} · ${SITE.mark}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
