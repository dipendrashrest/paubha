import { cn } from "@paubha/registry/lib/cn";

const TOKENS = [
  "bg-primary",
  "fg-brand",
  "glow-focus",
  "bg-brand-solid",
  "border-brand",
  "fg-on-brand",
  "bg-brand-subtle",
  "radius-md",
  "shadow-md",
  "space-2xs",
] as const;

/** One marquee per page. The token names are the product, not decoration. */
export function TokenMarquee({ className }: { className?: string }) {
  const loop = [...TOKENS, ...TOKENS];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-border-default bg-bg-secondary",
        className,
      )}
      aria-hidden="true"
    >
      <div className="pb-marquee-track flex w-max gap-10 py-4 pr-10">
        {loop.map((token, i) => (
          <span
            key={`${token}-${i}`}
            className="shrink-0 font-mono text-ui-sm text-fg-tertiary"
          >
            {token}
          </span>
        ))}
      </div>
    </div>
  );
}
