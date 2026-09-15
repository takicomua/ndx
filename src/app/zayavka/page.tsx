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

      <div className="section-band">
        <h1>{LEAD.title}</h1>
      </div>

      <div className="grid gap-10 px-0 py-6 lg:grid-cols-2 lg:gap-14 lg:py-10">
        <div>
          <p className="text-[1rem] leading-relaxed text-[#b3b3b3]">{LEAD.lead}</p>
          <ol className="book-toc mt-8">
            {LEAD.steps.map((s) => (
              <li key={s.n}>
                <span className="book-toc__n">
                  {String(s.n).padStart(2, "0")}
                </span>
                <div>
                  <p className="book-toc__t">{s.t}</p>
                  <p className="book-toc__d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="mt-8 space-y-2 text-[14px] text-[#9a9a9a]">
            {LEAD.trust.map((t) => (
              <li key={t}>— {t}</li>
            ))}
          </ul>
        </div>
        <div className="lead-panel">
          <LeadForm initialType={initialType} />
        </div>
      </div>

      <p className="px-0 pb-10 text-[14px] text-[#9a9a9a]">
        Або{" "}
        <Link href="/kontakt" className="text-white underline focus-ring">
          контакти напряму
        </Link>
        .
      </p>
    </SiteChrome>
  );
}
