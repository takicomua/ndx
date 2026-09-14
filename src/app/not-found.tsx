import Link from "next/link";
import { SiteChrome } from "@/components/site/chrome";

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="flex min-h-[60dvh] flex-col justify-center py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--dim)]">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-[var(--fg)] sm:text-4xl">
          Сторінку не знайдено
        </h1>
        <p className="mt-4 max-w-md text-[15px] text-[var(--dim)]">
          Можливо, адресу змінили або посилання застаріле. Поверніться на головну
          або оберіть розділ.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="btn-primary focus-ring"
          >
            На головну
          </Link>
          <Link
            href="/poslugy"
            className="btn-line focus-ring"
          >
            Послуги
          </Link>
          <Link
            href="/zayavka"
            className="btn-line focus-ring"
          >
            Заявка
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
