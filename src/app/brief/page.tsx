import type { Metadata } from "next";
import Link from "next/link";
import { BriefPanel } from "@/components/brief/panel";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SiteChrome } from "@/components/site/chrome";
import { SERVICE_PAGES } from "@/lib/content/services";
import { pageMetadata } from "@/lib/page-meta";

const TITLE = "Заявка на прорахунок";
const DESCRIPTION =
  "Короткий бриф: тип задачі, контакт і що має з’явитись. Відповідь з орієнтиром по строках і бюджету. NDX · Україна · Київ · remote.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/brief",
});

export default function BriefPage() {
  return (
    <SiteChrome active="brief">
      <PageJsonLd
        type="ContactPage"
        name={TITLE}
        description={DESCRIPTION}
        path="/brief"
        breadcrumbs={[
          { name: "NDX", path: "/" },
          { name: "Brief", path: "/brief" },
        ]}
      />
      <BriefPanel heading="h1" />
      <nav
        className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line)] py-10 font-mono text-[11px] tracking-wide text-[var(--dim)]"
        aria-label="Послуги"
      >
        {SERVICE_PAGES.map((item) => (
          <Link
            key={item.slug}
            href={`/poslugy/${item.slug}`}
            className="transition-colors hover:text-[var(--accent)] focus-ring"
          >
            {item.shortTitle}
          </Link>
        ))}
        <Link
          href="/keysy"
          className="transition-colors hover:text-[var(--accent)] focus-ring"
        >
          Підходи
        </Link>
      </nav>
    </SiteChrome>
  );
}
