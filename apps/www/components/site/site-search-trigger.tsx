"use client";

import { cn } from "@paubha/registry/lib/cn";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";

/**
 * Visually matches Input's box/icon/placeholder styling (border-default,
 * bg-primary, rounded-sm, fg-tertiary placeholder text) but is a real
 * <button> — it only opens Fumadocs' search modal, it doesn't accept typed
 * text itself, so using the real Input component here would misrepresent
 * its semantics.
 */
export function SiteSearchTrigger({ className }: { className?: string }) {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      aria-label="Search documentation"
      className={cn(
        // Full labeled box at lg+ (matches Figma); icon-only below that so
        // search stays reachable at every width without a second, redundant
        // search entry point elsewhere in the chrome.
        "flex items-center gap-2 rounded-sm border border-border-default bg-bg-primary transition-colors",
        "hover:border-border-strong",
        "focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
        "size-9 justify-center p-0 lg:w-70 lg:justify-start lg:px-3 lg:py-2",
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-fg-tertiary" aria-hidden="true" />
      <span className="hidden text-ui-md text-fg-tertiary lg:inline">
        Search documentation…
      </span>
    </button>
  );
}
