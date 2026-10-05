"use client";

import { Reveal } from "@/components/motion/reveal";
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
import { Newsletter } from "@paubha/registry/ui/newsletter";
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
import Link from "next/link";
import type * as React from "react";
import { Photo } from "./photo";
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
              avatar={
                <Avatar
                  src="/examples/photos/person-1.jpg"
                  alt="Maren Holloway"
                  size="sm"
                />
              }
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

      <div className="flex flex-col gap-4 p-4 text-left">
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
          <Metric compact label="Components" value="60" />
          <Metric compact label="Axe violations" value="0" />
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
                  Released
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>User menu</TableCell>
              <TableCell>Pattern</TableCell>
              <TableCell>
                <Badge variant="success" fill="subtle" size="sm">
                  Released
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

function Chunk({
  title,
  items,
  demo,
  flip = false,
}: {
  title: string;
  items: readonly { name: string; body: string }[];
  demo: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
        <h3 className="text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
          {title}
        </h3>
        <ul className="mt-5 flex flex-col gap-4">
          {items.map((it) => (
            <li key={it.name}>
              <p className="text-ui-md font-semibold text-fg-primary">
                {it.name}
              </p>
              <p className="mt-0.5 max-w-[44ch] text-body-sm text-fg-secondary">
                {it.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`min-w-0 rounded-lg bg-bg-secondary p-5 md:col-span-7 md:p-8 ${flip ? "md:order-1" : ""}`}
      >
        {demo}
      </div>
    </div>
  );
}

export function LaunchMarketingPage() {
  return (
    <MarketingShell
      announcement={
        <AnnouncementBar
          action={
            <Link
              href="/docs/application-patterns"
              className="font-medium text-fg-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
            >
              See what shipped
            </Link>
          }
        >
          New application patterns are in the registry.
        </AnnouncementBar>
      }
    >
      <section className="border-b border-border-default">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-16 text-center lg:pt-20">
          <h1 className="pb-enter mx-auto max-w-3xl text-balance text-display-md font-semibold tracking-[-0.04em] text-fg-primary lg:text-display-lg">
            Application patterns, ready to copy into your app.
          </h1>
          <p className="pb-enter mx-auto mt-4 max-w-lg text-balance text-body-lg text-fg-secondary">
            Tables, menus, pickers and navigation built from the base
            components. Free and MIT licensed.
          </p>
          <div className="pb-enter mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/docs/application-patterns"
              className={`${buttonVariants({ variant: "primary", size: "lg" })} pb-press whitespace-nowrap`}
            >
              Browse the patterns
            </Link>
            <Link
              href="/examples/marketing/changelog"
              className={`${buttonVariants({ variant: "secondary", size: "lg" })} pb-press whitespace-nowrap`}
            >
              Read the changelog
            </Link>
          </div>
          <div className="pb-enter-late mt-12 min-w-0">
            <ProductCanvas />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="grid grid-cols-5 gap-4 lg:col-span-8">
            <Photo
              name="laptop-code"
              priority
              sizes="(min-width: 1024px) 40vw, 60vw"
              className="col-span-3 aspect-[4/5] rounded-lg"
            />
            <Photo
              name="code-closeup"
              sizes="(min-width: 1024px) 26vw, 40vw"
              className="col-span-2 mt-10 aspect-[4/5] rounded-lg"
            />
          </div>
          <div className="lg:col-span-4">
            <h2 className="text-balance text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
              It is your code now.
            </h2>
            <p className="mt-3 text-body-md text-fg-secondary">
              Each pattern lands in your repo as a plain file. Read it, rename
              the props, delete what you do not need.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border-default">
        <div className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-20">
          <h2 className="max-w-md text-balance text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
            What is new
          </h2>
          <Reveal>
            <Chunk
              title="Find and filter"
              items={[
                {
                  name: "Data toolbar",
                  body: "Search, filter chips and actions in one responsive row.",
                },
                {
                  name: "Date picker",
                  body: "A calendar in a popover with full keyboard support.",
                },
                {
                  name: "Search field",
                  body: "Clear button, loading state and an Escape shortcut.",
                },
              ]}
              demo={
                <div className="flex flex-col gap-4">
                  <DataToolbar
                    search={<SearchField placeholder="Search" size="sm" />}
                    filters={
                      <>
                        <FilterChip label="Active" selected />
                        <FilterChip label="Archived" />
                      </>
                    }
                    actions={<DatePicker placeholder="Pick a date" />}
                  />
                </div>
              }
            />
          </Reveal>
          <Reveal>
            <Chunk
              flip
              title="Account and navigation"
              items={[
                {
                  name: "App nav",
                  body: "Logo, links and actions that collapse on small screens.",
                },
                {
                  name: "User menu",
                  body: "An avatar trigger with a dropdown, built on the menu primitive.",
                },
              ]}
              demo={
                <div className="flex items-center justify-between gap-4 rounded-md bg-bg-primary p-4">
                  <div className="flex items-center gap-2">
                    <Logo variant="icon" size={32} />
                    <span className="text-ui-md font-semibold text-fg-primary">
                      Workspace
                    </span>
                  </div>
                  <UserMenu
                    avatar={
                      <Avatar
                        src="/examples/photos/person-4.jpg"
                        alt="Tomás Aguilar"
                        size="sm"
                      />
                    }
                  >
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
                  </UserMenu>
                </div>
              }
            />
          </Reveal>
          <Reveal>
            <Chunk
              title="Consent and messaging"
              items={[
                {
                  name: "Cookie banner",
                  body: "Title, description and actions, with no tracking built in.",
                },
                {
                  name: "Announcement bar",
                  body: "A single line with a link, like the one at the top of this page.",
                },
              ]}
              demo={
                <CookieBanner
                  title="We keep cookies minimal."
                  description="Only what the site needs to work. Nothing is sent to ad networks."
                  actions={
                    <>
                      <Button variant="secondary" size="sm">
                        Decline
                      </Button>
                      <Button size="sm">Accept</Button>
                    </>
                  }
                />
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-balance text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
              Install one piece. Keep the rest.
            </h2>
            <p className="mt-3 max-w-md text-body-md text-fg-secondary">
              The CLI copies each file and its dependencies into your project.
            </p>
          </div>
          <CliSnippet
            command="npx paubha@latest add date-picker user-menu search-field"
            description="Button, Calendar, Popover and Input come along."
            showCopy
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <Newsletter
          title="Get the next release by email"
          description="One short email when new components ship. Unsubscribe any time."
          submitLabel="Subscribe"
        />
      </section>
    </MarketingShell>
  );
}
