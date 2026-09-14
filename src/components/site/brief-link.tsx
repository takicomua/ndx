"use client";

import Link from "next/link";
import { Suspense, type ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import { briefHref, mergeTrackingParams } from "@/lib/utm";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  type?: string;
};

function BriefLinkInner({ type, ...props }: Props) {
  const search = useSearchParams();
  const href = mergeTrackingParams(briefHref(type), search);
  return <Link href={href} {...props} />;
}

/** CTA to /brief that keeps UTM / gclid across internal hops. */
export function BriefLink({ type, ...props }: Props) {
  const fallback = briefHref(type);
  return (
    <Suspense fallback={<Link href={fallback} {...props} />}>
      <BriefLinkInner type={type} {...props} />
    </Suspense>
  );
}
