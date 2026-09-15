import type { Metadata } from "next";
import Link from "next/link";
import { FaqPageJsonLd, PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { ABOUT, FAQ, SITE } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = buildPageMetadata({
  title: "Про мене",
  description: ABOUT.lead,
  path: "/pro-mene",
});

export default function AboutPage() {
  return (
    <SiteChrome active="pro-mene">
      <PageJsonLd
        type="AboutPage"
        name={`Про мене — ${SITE.brandLine}`}
        description={ABOUT.lead}
        path="/pro-mene"
        breadcrumbs={[
          { name: SITE.brandLine, path: "/" },
          { name: "Про мене", path: "/pro-mene" },
        ]}
      />
      <FaqPageJsonLd items={FAQ.items} id={`${SITE.url}/pro-mene#faq`} />

      <div className="section-band">
        <h1>{ABOUT.title}</h1>
      </div>

      <div className="about-intro">
        <p className="about-intro__lead">{ABOUT.lead}</p>
        {ABOUT.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="about-intro__place">
          {SITE.geo} · {SITE.domain}
        </p>
        <p>
          Докладніше про назву бренду — у статті{" "}
          <Link
            href="/blog/shcho-take-ndx-diachenko"
            className="font-semibold text-[var(--accent)] focus-ring"
          >
            «Що таке NDX · DIACHENKO»
          </Link>
          .
        </p>
      </div>

      <div className="section-band">
        <h2>Як працюю</h2>
      </div>
      <div className="about-cards">
        {ABOUT.how.map((step, i) => (
          <article key={step.t} className="about-card">
            <p className="about-card__n">{String(i + 1).padStart(2, "0")}</p>
            <h3>{step.t}</h3>
            <p>{step.d}</p>
          </article>
        ))}
      </div>

      <div className="section-band">
        <h2>Технології</h2>
      </div>
      <div className="about-chips">
        {ABOUT.stack.split(", ").map((item) => (
          <span key={item} className="about-chip">
            {item.replace(/\.$/, "")}
          </span>
        ))}
      </div>

      <div id="faq" className="section-band scroll-mt-24">
        <h2>{FAQ.title}</h2>
      </div>
      <div className="about-faq">
        {FAQ.items.map((item) => (
          <article key={item.q} className="about-card">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </article>
        ))}
      </div>

      <div className="about-actions">
        <Link href="/zayavka" className="btn-primary focus-ring">
          Заявка
        </Link>
        <Link href="/kontakt" className="btn-ghost focus-ring">
          Контакти
        </Link>
      </div>
    </SiteChrome>
  );
}
