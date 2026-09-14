import {
  PERSON,
  SERVICES,
  SITE,
} from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/content/services";
import { absoluteUrl, getPublicEmail, getSameAs } from "@/lib/seo-helpers";

/** Site-wide identity graph. Page-specific WebPage / FAQ live on those routes. */
export function JsonLd() {
  const sameAs = getSameAs();
  const email = getPublicEmail();
  const orgId = `${SITE.url}/#organization`;
  const personId = `${SITE.url}/#person`;
  const websiteId = `${SITE.url}/#website`;
  const serviceId = `${SITE.url}/#service`;

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
        founder: { "@id": personId },
        brand: {
          "@type": "Brand",
          name: "NDX",
          slogan: SITE.tagline,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE.url,
        name: "NDX",
        alternateName: ["ndx", "DIACHENKO", SITE.domain],
        description: SITE.description,
        inLanguage: "uk-UA",
        publisher: { "@id": orgId },
        copyrightHolder: { "@id": personId },
        potentialAction: {
          "@type": "ContactAction",
          name: "Заявка на прорахунок",
          target: absoluteUrl("/brief"),
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON.name,
        givenName: PERSON.givenName,
        familyName: PERSON.familyName,
        alternateName: ["NDX", "ndx", SITE.brand, "Diachenko"],
        url: SITE.url,
        image: `${SITE.url}/icon-512`,
        jobTitle: PERSON.jobTitle,
        description: SITE.description,
        ...(email ? { email } : {}),
        worksFor: { "@id": orgId },
        sameAs,
        knowsLanguage: ["uk", "en"],
        knowsAbout: [
          "розробка сайтів",
          "лендінги під рекламу",
          "інтернет-магазини",
          "веб-кабінети",
          "веб-системи",
          "Next.js",
          "React",
          "TypeScript",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kyiv",
          addressCountry: "UA",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: "NDX — інженер повного циклу",
        image: `${SITE.url}/opengraph-image`,
        url: SITE.url,
        description: SERVICES.lead,
        areaServed: [
          { "@type": "Country", name: "Ukraine" },
          { "@type": "City", name: "Kyiv" },
        ],
        availableLanguage: ["uk", "en"],
        provider: { "@id": personId },
        brand: { "@id": orgId },
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
