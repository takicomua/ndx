import Link from "next/link";
import { SiteChrome } from "@/components/site/chrome";

export default function NotFound() {
  return (
    <SiteChrome>
      <div className="section-band !px-0">
        <h1>404</h1>
      </div>
      <section className="px-0 py-10">
        <p className="max-w-md text-[1.05rem] text-[#9a9a9a]">
          Сторінку не знайдено. Можливо, адресу змінили.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary focus-ring">
            На головну
          </Link>
          <Link href="/poslugy" className="btn-ghost focus-ring">
            Послуги
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
