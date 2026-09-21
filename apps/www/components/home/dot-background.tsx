import { cn } from "@paubha/registry/lib/cn";

/**
 * Aceternity-style dotted field for the hero. Overhangs a bit past the
 * mosaic seam, then fades. A copy-sized wash keeps headline + subcopy
 * off the grid.
 */
export function DotBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -bottom-28 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:32px_32px]",
          "[background-image:radial-gradient(var(--gray-300)_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(var(--gray-800)_1px,transparent_1px)]",
          "[mask-image:linear-gradient(to_bottom,black_0%,black_93%,transparent_100%)]",
          "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_93%,transparent_100%)]",
        )}
      />
      <div
        className={cn(
          "absolute top-40 left-1/2 h-72 w-[min(48rem,90%)] -translate-x-1/2 bg-bg-primary",
          "[mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_78%)]",
          "[-webkit-mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_78%)]",
        )}
      />
    </div>
  );
}
