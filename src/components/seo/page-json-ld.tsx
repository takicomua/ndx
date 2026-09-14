import { PERSON, SITE } from "@/lib/constants";
import { absoluteUrl, getPublicEmail, getSameAs } from "@/lib/seo-helpers";

type Breadcrumb = { name: string; path: string };

export function PageJsonLd({
  type,
  name,
  description,
  path,
  breadcrumbs,
  faq,
  itemList,
}: {
  type: "Service" | "Article" | "CollectionPage" | "ContactPage";
  name: string;
  description: string;
  path: string;
  breadcrumbs: Breadcrumb[];
  faq?: readonly { q: string; a: string }[];
  itemList?: readonly { name: string; path: string }[];
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
      "@type": type === "ContactPage" ? "ContactPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": `${SITE.url}/#website` },
      inLanguage: "uk-UA",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE.url}/opengraph-image`,
      },
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
        "@id": `${SITE.url}/#person`,
        name: PERSON.name,
        url: SITE.url,
        ...(email ? { email } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      areaServed: [
        { "@type": "Country", name: "Ukraine" },
        { "@type": "City", name: "Kyiv" },
      ],
      availableLanguage: ["uk", "en"],
    });
  }

  if (type === "Article") {
    graph.push({
      "@type": "Article",
      headline: name,
      description,
      url,
      inLanguage: "uk-UA",
      author: {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: PERSON.name,
        url: SITE.url,
      },
      publisher: { "@id": `${SITE.url}/#organization` },
      image: `${SITE.url}/opengraph-image`,
    });
  }

  if (type === "CollectionPage" && itemList?.length) {
    graph.push({
      "@type": "ItemList",
      itemListElement: itemList.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
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
