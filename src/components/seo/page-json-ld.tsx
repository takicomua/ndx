import { absoluteUrl, getPublicEmail, getSameAs } from "@/lib/seo-helpers";
import { SITE } from "@/lib/constants";

type Breadcrumb = { name: string; path: string };

export function PageJsonLd({
  type,
  name,
  description,
  path,
  breadcrumbs,
  faq,
}: {
  type: "Service" | "Article" | "CollectionPage";
  name: string;
  description: string;
  path: string;
  breadcrumbs: Breadcrumb[];
  faq?: readonly { q: string; a: string }[];
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
      "@type": "WebPage",
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
        name: SITE.brand,
        url: SITE.url,
        ...(email ? { email } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      areaServed: { "@type": "Country", name: "Ukraine" },
    });
  }

  if (type === "Article") {
    graph.push({
      "@type": "Article",
      headline: name,
      description,
      url,
      inLanguage: "uk-UA",
      author: { "@type": "Person", name: SITE.brand, url: SITE.url },
      publisher: { "@id": `${SITE.url}/#organization` },
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
