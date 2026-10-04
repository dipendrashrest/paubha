import { AboutMarketingPage } from "@/components/examples/marketing/about";
import { AuthMarketingPage } from "@/components/examples/marketing/auth";
import { BlogMarketingPage } from "@/components/examples/marketing/blog";
import { CareersMarketingPage } from "@/components/examples/marketing/careers";
import { ChangelogMarketingPage } from "@/components/examples/marketing/changelog";
import { ContactMarketingPage } from "@/components/examples/marketing/contact";
import { CustomersMarketingPage } from "@/components/examples/marketing/customers";
import { LaunchMarketingPage } from "@/components/examples/marketing/launch";
import { OpenSourceMarketingPage } from "@/components/examples/marketing/open-source";
import { PricingMarketingPage } from "@/components/examples/marketing/pricing";
import { SaasMarketingPage } from "@/components/examples/marketing/saas";
import {
  MARKETING_EXAMPLES,
  type MarketingSlug,
} from "@/components/examples/marketing/shell";
import { StudioMarketingPage } from "@/components/examples/marketing/studio";
import { WaitlistMarketingPage } from "@/components/examples/marketing/waitlist";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

const PAGES: Record<MarketingSlug, ComponentType> = {
  saas: SaasMarketingPage,
  pricing: PricingMarketingPage,
  waitlist: WaitlistMarketingPage,
  about: AboutMarketingPage,
  changelog: ChangelogMarketingPage,
  contact: ContactMarketingPage,
  blog: BlogMarketingPage,
  auth: AuthMarketingPage,
  launch: LaunchMarketingPage,
  studio: StudioMarketingPage,
  "open-source": OpenSourceMarketingPage,
  careers: CareersMarketingPage,
  customers: CustomersMarketingPage,
};

export function generateStaticParams() {
  return MARKETING_EXAMPLES.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const meta = MARKETING_EXAMPLES.find((e) => e.slug === slug);
    if (!meta) return { title: "Marketing Example" };
    return {
      title: `${meta.title} · Marketing Examples`,
      description: meta.description,
    };
  });
}

export default async function MarketingExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Page = PAGES[slug as MarketingSlug];
  if (!Page) notFound();
  return <Page />;
}
