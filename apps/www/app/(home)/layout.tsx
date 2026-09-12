import { baseOptions } from "@/app/layout.config";
import { SiteNavbar } from "@/components/site/site-navbar";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      nav={{ ...baseOptions.nav, component: <SiteNavbar /> }}
    >
      {children}
    </HomeLayout>
  );
}
