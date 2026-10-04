"use client";

import { BrandField } from "@/components/motion/brand-field";
import { Reveal } from "@/components/motion/reveal";
import { TokenMarquee } from "@/components/motion/token-marquee";
import { AnnouncementBar } from "@paubha/registry/ui/announcement-bar";
import {
  AppNav,
  AppNavBrand,
  AppNavLink,
  AppNavLinks,
} from "@paubha/registry/ui/app-nav";
import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { Button, buttonVariants } from "@paubha/registry/ui/button";
import { CliSnippet } from "@paubha/registry/ui/cli-snippet";
import { CookieBanner } from "@paubha/registry/ui/cookie-banner";
import { DataToolbar } from "@paubha/registry/ui/data-toolbar";
import { DatePicker } from "@paubha/registry/ui/date-picker";
import { DropdownMenuItem } from "@paubha/registry/ui/dropdown-menu";
import { FilterChip } from "@paubha/registry/ui/filter";
import { Logo } from "@paubha/registry/ui/logo";
import { Metric, MetricGroup } from "@paubha/registry/ui/metric";
import { SearchField } from "@paubha/registry/ui/search-field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@paubha/registry/ui/table";
import { UserMenu } from "@paubha/registry/ui/user-menu";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { MarketingShell } from "./shell";

function ProductCanvas() {
  return (
    <div className="overflow-hidden rounded-lg border border-border-default bg-bg-primary shadow-md">
      <AppNav
        logo={
          <AppNavBrand>
            <Logo variant="icon" size={32} />
            <span className="text-ui-md font-semibold text-fg-primary">
              Paubha
            </span>
          </AppNavBrand>
        }
        actions={
          <>
            <SearchField
              placeholder="Search registry"
              size="sm"
              className="hidden w-52 sm:flex"
            />
            <UserMenu
              avatar={<Avatar initials="AR" alt="Ava Ruiz" size="sm" />}
            >
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
            </UserMenu>
          </>
        }
      >
        <AppNavLinks className="hidden lg:flex">
          <AppNavLink active>Registry</AppNavLink>
          <AppNavLink>Patterns</AppNavLink>
          <AppNavLink>Figma</AppNavLink>
        </AppNavLinks>
      </AppNav>

      <div className="flex flex-col gap-4 p-4">
        <DataToolbar
          search={<SearchField placeholder="Filter components" size="sm" />}
          filters={
            <>
              <FilterChip label="Patterns" selected />
              <FilterChip label="Base" />
            </>
          }
          actions={<DatePicker placeholder="This week" />}
        />
        <MetricGroup>
          <Metric compact label="Components" value="74" trend="up" delta="9" />
          <Metric compact label="Axe" value="0" description="violations" />
          <Metric compact label="License" value="MIT" />
        </MetricGroup>
        <Table variant="bordered">
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Kind</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Date picker</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell>
                <Badge variant="success" fill="subtle" size="sm">
                  Live
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>User menu</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell>
                <Badge variant="success" fill="subtle" size="sm">
                  Live
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Search field</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell>
                <Badge variant="brand" fill="subtle" size="sm">
                  New
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function LaunchMarketingPage() {
  const [cookies, setCookies] = React.useState(true);

  return (
    <MarketingShell
      announcement={
        <AnnouncementBar
          badge={
            <Badge variant="brand" fill="solid" size="sm">
              Drop
            </Badge>
          }
          action={
            <Link
              href="/docs/application-patterns"
              className="font-medium text-fg-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
            >
              See what shipped
            </Link>
          }
        >
          Nine new patterns just landed. The catalog is still free.
        </AnnouncementBar>
      }
    >
      <section className="relative min-h-[100dvh] overflow-hidden border-b border-border-default">
        <BrandField />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div className="pb-enter">
            <Badge variant="brand" fill="subtle" size="md">
              Launch
            </Badge>
            <h1 className="mt-5 max-w-xl text-balance text-display-md font-semibold tracking-[-0.04em] text-fg-primary lg:text-display-lg">
              The landing is the product.
            </h1>
            <p className="mt-4 max-w-md text-balance text-body-lg text-fg-secondary">
              Live Paubha in the hero. Nav, search, table, glow-focus. Copy it.
              Own it.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/docs"
                className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press`}
              >
                Get the kit
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/examples/marketing"
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press`}
              >
                More pages
              </Link>
            </div>
          </div>
          <div className="pb-enter-late min-w-0">
            <ProductCanvas />
          </div>
        </div>
      </section>

      <TokenMarquee />

      <Reveal className="border-b border-border-default bg-bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
              Install one piece. Keep the rest.
            </h2>
            <p className="mt-3 max-w-md text-body-md text-fg-secondary">
              The file lands in your repo. Theme it with semantic tokens. Never
              wait on a vendor upgrade.
            </p>
          </div>
          <CliSnippet
            label="Ship tonight"
            command="npx paubha@latest add date-picker user-menu search-field"
            description="Walks registryDependencies. Button, Calendar, Popover, Input come along."
          />
        </div>
      </Reveal>

      {cookies ? (
        <div className="sticky bottom-4 z-40 mx-auto w-full max-w-6xl px-6 pb-6">
          <CookieBanner
            title="This page is the demo."
            description="No analytics cookies. The banner is a Paubha pattern. Accept just dismisses it."
            actions={
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCookies(false)}
                >
                  Decline
                </Button>
                <Button size="sm" onClick={() => setCookies(false)}>
                  Accept
                </Button>
              </>
            }
          />
        </div>
      ) : null}
    </MarketingShell>
  );
}
