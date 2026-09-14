import type { Metadata } from "next";
import Link from "next/link";
import { FaqPageJsonLd, PageJsonLd } from "@/components/seo/page-json-ld";
import { FaqBlock } from "@/components/site/faq-block";
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

      <article className="mx-auto max-w-3xl py-16 sm:py-20">
        <p className="text-sm font-medium text-[var(--accent)]">{ABOUT.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
          {ABOUT.title}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--dim)]">
          {ABOUT.lead}
        </p>
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[var(--dim)]">
          {ABOUT.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--fg)]">
          {SITE.geo} · {SITE.domain}
        </p>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--dim)]">
          Докладніше про назву бренду — у статті{" "}
          <Link
            href="/blog/shcho-take-ndx-diachenko"
            className="font-semibold text-[var(--accent)] focus-ring"
          >
            «Що таке NDX · DIACHENKO»
          </Link>
          .
        </p>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">
          Як працюю
        </h2>
        <ol className="mt-8 space-y-6">
          {ABOUT.how.map((step, i) => (
            <li key={step.t} className="flex gap-4">
              <span className="font-mono text-sm text-[var(--accent)]">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-[var(--fg)]">{step.t}</p>
                <p className="mt-1 text-[16px] text-[var(--dim)]">{step.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">
          Технології
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--dim)]">
          {ABOUT.stack}
        </p>

        <FaqBlock headingClassName="mt-16 scroll-mt-24 font-display text-2xl font-semibold tracking-tight" />

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/zayavka" className="btn-primary focus-ring">
            Заявка
          </Link>
          <Link href="/kontakt" className="btn-line focus-ring">
            Контакти
          </Link>
        </div>
      </article>
    </SiteChrome>
  );
}
