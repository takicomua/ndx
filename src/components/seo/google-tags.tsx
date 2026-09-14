import Script from "next/script";
import {
  gtagBootstrapId,
  hasGoogleAds,
  hasGoogleAnalytics,
  hasGtm,
  hasMetaPixel,
  SEO,
} from "@/lib/seo";

/**
 * Optional tags — only when env IDs are set.
 * Organic SEO does not depend on these. Direct gtag is skipped if GTM is present
 * (configure a GTM trigger on Custom Event `generate_lead` instead).
 */
export function GoogleTags() {
  const gtm = hasGtm();
  const gtagId = gtagBootstrapId();
  const meta = hasMetaPixel() && !gtm;

  if (!gtm && !gtagId && !meta) return null;

  const gtagConfigs = [
    hasGoogleAnalytics()
      ? `gtag('config', '${SEO.gaId}', { anonymize_ip: true });`
      : "",
    hasGoogleAds() ? `gtag('config', '${SEO.googleAdsId}');` : "",
  ]
    .filter(Boolean)
    .join("\n            ");

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

      {gtagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${gtagConfigs}
          `}</Script>
        </>
      ) : null}

      {meta ? (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${SEO.metaPixelId}');
          fbq('track', 'PageView');
        `}</Script>
      ) : null}
    </>
  );
}

export function GtmNoscript() {
  const gtm = hasGtm();
  const meta = hasMetaPixel() && !gtm;
  if (!gtm && !meta) return null;

  return (
    <>
      {gtm ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${SEO.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
      ) : null}
      {meta ? (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height={1}
            width={1}
            alt=""
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${SEO.metaPixelId}&ev=PageView&noscript=1`}
          />
        </noscript>
      ) : null}
    </>
  );
}
