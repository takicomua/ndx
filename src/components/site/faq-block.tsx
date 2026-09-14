import { FAQ } from "@/lib/constants";

export function FaqBlock({
  headingClassName = "scroll-mt-24 font-display text-2xl font-semibold tracking-tight",
}: {
  headingClassName?: string;
}) {
  return (
    <>
      <h2 id="faq" className={headingClassName}>
        {FAQ.title}
      </h2>
      <dl className="list-plain mt-8">
        {FAQ.items.map((item) => (
          <div key={item.q} className="py-5">
            <dt className="font-semibold text-[var(--fg)]">{item.q}</dt>
            <dd className="mt-2 text-[16px] leading-relaxed text-[var(--dim)]">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
