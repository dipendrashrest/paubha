import { baseOptions } from "@/app/layout.config";
import { SiteNavbar } from "@/components/site/site-navbar";
import { siteSidebarComponents } from "@/components/site/site-sidebar";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      nav={{ ...baseOptions.nav, component: <SiteNavbar showSidebarTrigger /> }}
      sidebar={{ components: siteSidebarComponents }}
    >
      {children}
    </DocsLayout>
  );
}
