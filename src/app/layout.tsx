import type { Metadata } from "next";
import { IBM_Plex_Mono, Literata, Source_Sans_3 } from "next/font/google";
import { GoogleTags, GtmNoscript } from "@/components/seo/google-tags";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/constants";
import { SEO } from "@/lib/seo";
import { shouldNoIndex } from "@/lib/security";
import "./globals.css";

const display = Literata({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
});

const verification: Metadata["verification"] = {
  ...(SEO.googleSiteVerification
    ? { google: SEO.googleSiteVerification }
    : {}),
  ...(SEO.yandexVerification || SEO.bingSiteVerification
    ? {
        other: {
          ...(SEO.yandexVerification
            ? { "yandex-verification": SEO.yandexVerification }
            : {}),
          ...(SEO.bingSiteVerification
            ? { "msvalidate.01": SEO.bingSiteVerification }
            : {}),
        },
      }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.brandLine}`,
  },
  description: SITE.description,
  applicationName: SITE.brandLine,
  keywords: [
    "NDX",
    "ndx",
    "NDX · DIACHENKO",
    "NDX DIACHENKO",
    "ndx.com.ua",
    "DIACHENKO",
    "розробка сайтів",
    "інженер повного циклу",
    "full-cycle engineer",
    "створення сайтів",
    "інтернет-магазин",
    "розробка інтернет магазину",
    "лендінг",
    "сайт під ключ",
    "веб-розробка Україна",
    "розробка сайтів Київ",
    "IDEA → LIVE",
    "Next.js",
    "React",
  ],
  authors: [{ name: SITE.brandLine, url: SITE.url }],
  creator: SITE.brandLine,
  publisher: SITE.brandLine,
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: shouldNoIndex()
    ? {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      }
    : {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    locale: "uk_UA",
    url: SITE.url,
    siteName: SITE.brandLine,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.mark} · ${SITE.brand}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/twitter-image"],
  },
  alternates: {
    canonical: SITE.url,
    languages: {
      "uk-UA": SITE.url,
    },
  },
  verification: Object.keys(verification).length ? verification : undefined,
  other: {
    "geo.region": "UA-30",
    "geo.placename": "Kyiv",
    "geo.position": "50.4501;30.5234",
    ICBM: "50.4501, 30.5234",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
      style={{ backgroundColor: "#f6f6f4", colorScheme: "light" }}
    >
      <body
        className="min-h-full bg-[var(--bg)] font-sans text-[var(--fg)]"
        style={{ backgroundColor: "#f6f6f4", color: "#121212" }}
      >
        <GtmNoscript />
        <JsonLd />
        <GoogleTags />
        {children}
      </body>
    </html>
  );
}
