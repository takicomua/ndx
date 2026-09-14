import {
  AUDIENCE,
  SERVICES,
  SITE,
} from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/content/services";
import {
  absoluteUrl,
  getBusinessGeo,
  getBusinessPhone,
  getPublicEmail,
  getSameAs,
  postalAddress,
} from "@/lib/seo-helpers";

/** Structured data for Google rich results */
export function JsonLd() {
  const sameAs = getSameAs();
  const email = getPublicEmail();
  const phone = getBusinessPhone();
  const geo = getBusinessGeo();
  const orgId = `${SITE.url}/#organization`;
  const personId = `${SITE.url}/#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.brandLine,
        legalName: SITE.brand,
        alternateName: [...SITE.alternateNames],
        url: SITE.url,
        logo: `${SITE.url}/icon-512`,
        image: `${SITE.url}/opengraph-image`,
        description: SITE.description,
        disambiguatingDescription: SITE.disambiguatingDescription,
        ...(email ? { email } : {}),
        address: postalAddress(),
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
          "@id": `${SITE.url}/#brand`,
          name: SITE.brandLine,
          alternateName: [...SITE.alternateNames],
          slogan: SITE.tagline,
          url: SITE.url,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.brandLine,
        alternateName: [...SITE.alternateNames],
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
        name: SITE.brandLine,
        alternateName: [...SITE.alternateNames],
        url: SITE.url,
        image: `${SITE.url}/icon-512`,
        jobTitle: "Інженер повного циклу",
        description: SITE.description,
        disambiguatingDescription: SITE.disambiguatingDescription,
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
        address: postalAddress(),
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${SITE.url}/#localbusiness`,
        name: SITE.brandLine,
        alternateName: [...SITE.alternateNames],
        disambiguatingDescription: SITE.disambiguatingDescription,
        image: `${SITE.url}/opengraph-image`,
        url: SITE.url,
        description: SITE.description,
        ...(email ? { email } : {}),
        ...(phone ? { telephone: phone } : {}),
        priceRange: "$400–$8000+",
        areaServed: [
          { "@type": "Country", name: "Ukraine" },
          { "@type": "City", name: "Kyiv" },
        ],
        availableLanguage: ["uk", "en"],
        provider: { "@id": personId },
        brand: { "@id": orgId },
        parentOrganization: { "@id": orgId },
        address: postalAddress(),
        ...(geo
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: geo.latitude,
                longitude: geo.longitude,
              },
            }
          : {}),
        ...(sameAs.length ? { sameAs } : {}),
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
            name: SITE.brandLine,
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
