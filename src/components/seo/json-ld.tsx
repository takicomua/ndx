import {
  AUDIENCE,
  FAQ,
  SERVICES,
  SITE,
} from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/content/services";
import { absoluteUrl, getPublicEmail, getSameAs } from "@/lib/seo-helpers";

/** Structured data for Google rich results */
export function JsonLd() {
  const sameAs = getSameAs();
  const email = getPublicEmail();
  const orgId = `${SITE.url}/#organization`;
  const personId = `${SITE.url}/#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "NDX",
        legalName: SITE.brand,
        alternateName: ["ndx", SITE.domain, SITE.brand],
        url: SITE.url,
        logo: `${SITE.url}/icon-512`,
        image: `${SITE.url}/opengraph-image`,
        description: SITE.description,
        ...(email ? { email } : {}),
        foundingLocation: {
          "@type": "Country",
          name: "Ukraine",
        },
        areaServed: [
          { "@type": "Country", name: "Ukraine" },
          { "@type": "City", name: "Kyiv" },
        ],
        sameAs,
        brand: {
          "@type": "Brand",
          name: "NDX",
          slogan: SITE.tagline,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: "NDX",
        alternateName: ["ndx", "DIACHENKO", SITE.domain],
        description: SITE.description,
        inLanguage: "uk-UA",
        publisher: { "@id": orgId },
        copyrightHolder: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/opengraph-image`,
        },
        inLanguage: "uk-UA",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.brand,
        alternateName: ["NDX", "ndx", "Diachenko"],
        url: SITE.url,
        image: `${SITE.url}/icon-512`,
        jobTitle: "Інженер повного циклу",
        description: SITE.description,
        ...(email ? { email } : {}),
        worksFor: { "@id": orgId },
        sameAs,
        knowsAbout: [
          "інженер повного циклу",
          "full-cycle engineer",
          "розробка сайтів",
          "інтернет-магазин",
          "лендінг",
          "веб-системи",
          "IDEA → LIVE",
          "Next.js",
          "React",
          "TypeScript",
          "Київ",
          "Україна",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kyiv",
          addressCountry: "UA",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#service`,
        name: "NDX — інженер повного циклу",
        image: `${SITE.url}/opengraph-image`,
        url: SITE.url,
        description: SERVICES.lead,
        priceRange: "$400–$8000+",
        areaServed: [
          { "@type": "Country", name: "Ukraine" },
          { "@type": "City", name: "Kyiv" },
        ],
        availableLanguage: ["uk", "en"],
        provider: { "@id": personId },
        brand: { "@id": orgId },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kyiv",
          addressCountry: "UA",
        },
        serviceType: SERVICES.items.map((i) => i.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Послуги NDX",
          itemListElement: SERVICE_PAGES.map((item, i) => ({
            "@type": "Offer",
            position: i + 1,
            url: absoluteUrl(`/poslugy/${item.slug}`),
            itemOffered: {
              "@type": "Service",
              name: item.shortTitle,
              description: item.lead,
              url: absoluteUrl(`/poslugy/${item.slug}`),
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/pro-mene#faq`,
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
        "@type": "ItemList",
        name: "Для кого NDX",
        itemListElement: AUDIENCE.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.title,
          description: item.text,
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
        name: "Послуги",
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
