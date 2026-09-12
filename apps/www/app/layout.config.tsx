import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { PanelLeft } from "lucide-react";

export const baseOptions: BaseLayoutProps = {
  nav: {
    // Only shows inside DocsLayout's own sidebar header — the main top bar
    // is fully replaced by <SiteNavbar/> (see app/docs/layout.tsx and
    // app/(home)/layout.tsx), which doesn't read this title.
    title: (
      <span className="inline-flex items-center gap-2 text-ui-sm text-fg-secondary">
        <PanelLeft className="size-4" aria-hidden="true" />
        Documentation
      </span>
    ),
  },
  // <SiteNavbar/>'s own SiteSearchTrigger is reachable at every breakpoint,
  // so DocsLayout's sidebar-header search box (Fumadocs' own default) would
  // just be a redundant second entry point — disabled.
  searchToggle: {
    enabled: false,
  },
  // Empty: both HomeLayout's default Header and DocsLayout's sidebar link
  // list (which consume this) are fully replaced by <SiteNavbar/>'s own nav
  // links — leaving this populated would render a redundant duplicate list.
  links: [],
};
