import { FAQ, SITE } from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/content/services";
import { absoluteUrl } from "@/lib/seo-helpers";

/** Homepage-only graph: do not emit FAQPage / home WebPage on other routes. */
export function HomeJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/opengraph-image`,
        },
        inLanguage: "uk-UA",
        hasPart: SERVICE_PAGES.map((item) => ({
          "@type": "WebPage",
          url: absoluteUrl(`/poslugy/${item.slug}`),
          name: item.shortTitle,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        url: `${SITE.url}/#faq`,
        isPartOf: { "@id": `${SITE.url}/#webpage` },
        mainEntity: FAQ.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "NDX",
            item: SITE.url,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Послуги NDX",
        itemListElement: SERVICE_PAGES.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.shortTitle,
          url: absoluteUrl(`/poslugy/${item.slug}`),
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
