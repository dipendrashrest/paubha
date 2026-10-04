"use client";

import { buttonVariants } from "@paubha/registry/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function MarketingExamplePreview({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const href = `/examples/marketing/${slug}`;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border-default bg-bg-secondary">
      <div className="flex items-center justify-between gap-3 border-b border-border-default px-4 py-3">
        <p className="text-ui-sm font-medium text-fg-secondary">
          Live preview · {title}
        </p>
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Open full page
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <div className="bg-bg-preview">
        <iframe
          title={`${title} marketing example`}
          src={href}
          className="h-[640px] w-full border-0 bg-bg-primary"
          loading="lazy"
        />
      </div>
    </div>
  );
}
