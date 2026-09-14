/** Client-side conversion helpers (GA4 / GTM dataLayer). */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLeadSubmit(payload: {
  type: string;
  budget: string;
  timeline: string;
}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    lead_type: payload.type,
    lead_budget: payload.budget,
    lead_timeline: payload.timeline,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      currency: "USD",
      value: 1,
      lead_type: payload.type,
      lead_budget: payload.budget,
      lead_timeline: payload.timeline,
    });
  }
}
