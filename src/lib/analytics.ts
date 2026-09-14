import {
  googleAdsSendTo,
  hasGtm,
  hasMetaPixel,
} from "@/lib/seo";

type TrackerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * Successful Brief submit.
 * Always: dataLayer `generate_lead` (GTM can listen).
 * If gtag is loaded directly (no GTM) and Ads send_to is set:
 * GA4 generate_lead + Google Ads `conversion` (Search test).
 */
export function trackLeadSubmit() {
  if (typeof window === "undefined") return;
  const w = window as TrackerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "generate_lead",
    method: "brief_form",
  });

  if (!hasGtm()) {
    w.gtag?.("event", "generate_lead", { method: "brief_form" });
    const sendTo = googleAdsSendTo();
    if (sendTo) {
      w.gtag?.("event", "conversion", {
        send_to: sendTo,
      });
    }
  }

  if (hasMetaPixel()) {
    w.fbq?.("track", "Lead");
  }
}
