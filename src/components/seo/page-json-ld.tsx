import { absoluteUrl, getPublicEmail, getSameAs } from "@/lib/seo-helpers";
import { SITE } from "@/lib/constants";

type Breadcrumb = { name: string; path: string };
type Offer = { name: string; price: string; description?: string };

export function PageJsonLd({
  type,
  name,
  description,
  path,
  breadcrumbs,
  faq,
  offers,
  datePublished,
}: {
  type:
    | "Service"
    | "Article"
    | "CollectionPage"
    | "WebPage"
    | "AboutPage"
    | "ContactPage";
  name: string;
  description: string;
  path: string;
  breadcrumbs: Breadcrumb[];
  faq?: readonly { q: string; a: string }[];
  offers?: Offer[];
  datePublished?: string;
}) {
  const url = absoluteUrl(path);
  const sameAs = getSameAs();
  const email = getPublicEmail();

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: absoluteUrl(b.path),
      })),
    },
    {
      "@type": type === "Article" || type === "Service" ? "WebPage" : type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": `${SITE.url}/#website` },
      inLanguage: "uk-UA",
    },
  ];

  if (type === "Service") {
    graph.push({
      "@type": "Service",
      name,
      description,
      url,
      provider: {
        "@type": "Person",
        name: SITE.brandLine,
        url: SITE.url,
        ...(email ? { email } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      areaServed: [
        { "@type": "Country", name: "Ukraine" },
        { "@type": "City", name: "Kyiv" },
      ],
      ...(offers?.length
        ? {
            offers: offers.map((o) => ({
              "@type": "Offer",
              name: o.name,
              description: o.description || o.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url,
            })),
          }
        : {}),
    });
  }

  if (type === "Article") {
    graph.push({
      "@type": "Article",
      headline: name,
      description,
      url,
      inLanguage: "uk-UA",
      ...(datePublished
        ? { datePublished, dateModified: datePublished }
        : {}),
      author: { "@type": "Person", name: SITE.brandLine, url: SITE.url },
      publisher: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: { "@id": `${url}#webpage` },
    });
  }

  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}

/** FAQPage JSON-LD for a single URL (do not emit sitewide). */
export function FaqPageJsonLd({
  items,
  id = `${SITE.url}/#faq`,
}: {
  items: readonly { q: string; a: string }[];
  id?: string;
}) {
  if (!items.length) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": id,
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      }}
    />
  );
}
