import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/lead/lead-form";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { LEAD } from "@/lib/lead";
import { buildPageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = buildPageMetadata({
  title: "Заявка — орієнтир по строках і бюджету",
  description: LEAD.lead,
  path: "/zayavka",
});

type Props = { searchParams: Promise<{ type?: string | string[] }> };

function typeFromSearch(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const t = value?.trim();
  if (t && LEAD.types.some((item) => item.id === t)) return t;
  return undefined;
}

export default async function LeadPage({ searchParams }: Props) {
  const q = await searchParams;
  const initialType = typeFromSearch(q.type);

  return (
    <SiteChrome active="zayavka">
      <PageJsonLd
        type="WebPage"
        name={LEAD.title}
        description={LEAD.lead}
        path="/zayavka"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Заявка", path: "/zayavka" },
        ]}
      />

      <div className="mx-auto max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          {LEAD.title}
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[var(--dim)]">
          {LEAD.lead}
        </p>

        <ol className="mt-10 space-y-3 text-[15px] text-[var(--dim)]">
          {LEAD.steps.map((s) => (
            <li key={s.n}>
              <span className="font-semibold text-[var(--fg)]">
                {s.n}. {s.t}
              </span>
              {" — "}
              {s.d}
            </li>
          ))}
        </ol>

        <ul className="mt-6 space-y-1 text-sm text-[var(--dim)]">
          {LEAD.trust.map((t) => (
            <li key={t}>• {t}</li>
          ))}
        </ul>

        <div className="lead-panel mt-12">
          <LeadForm initialType={initialType} />
        </div>

        <p className="mt-8 text-sm text-[var(--dim)]">
          Або{" "}
          <Link href="/kontakt" className="text-[var(--accent)] focus-ring">
            контакти напряму
          </Link>
          .
        </p>
      </div>
    </SiteChrome>
  );
}
