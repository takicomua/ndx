import Script from "next/script";
import { hasGoogleAnalytics, hasGtm, SEO } from "@/lib/seo";

/** Google Tag Manager + GA4 — only inject when IDs are set in env */
export function GoogleTags() {
  const gtm = hasGtm();
  const ga = hasGoogleAnalytics();

  if (!gtm && !ga) return null;

  return (
    <>
      {gtm ? (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${SEO.gtmId}');
        `}</Script>
      ) : null}

      {ga && !gtm ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${SEO.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SEO.gaId}', { anonymize_ip: true });
          `}</Script>
        </>
      ) : null}
    </>
  );
}

export function GtmNoscript() {
  if (!hasGtm()) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${SEO.gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
