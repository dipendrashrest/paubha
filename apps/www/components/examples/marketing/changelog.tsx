import {
  ActivityFeed,
  ActivityFeedTimelineItem,
} from "@paubha/registry/ui/activity-feed";
import { Badge } from "@paubha/registry/ui/badge";
import { Divider } from "@paubha/registry/ui/divider";
import { MarketingShell } from "./shell";

const ENTRIES = [
  {
    version: "0.9.3",
    date: "Sep 22, 2026",
    title: "Marketing pattern pack",
    status: "New" as const,
    body: "Pricing card, FAQ, feature list, CLI snippet, icon list, blog card, and team card, wired into the live marketing examples.",
  },
  {
    version: "0.9.2",
    date: "Sep 18, 2026",
    title: "Application patterns expand",
    status: "New" as const,
    body: "Page header, metric, empty state, and filter patterns join the registry, copy-paste ready.",
  },
  {
    version: "0.9.1",
    date: "Sep 10, 2026",
    title: "Brand palette resync",
    status: "Improved" as const,
    body: "Tokens realigned to Figma’s Brand Palette frame: brand-500 keystone and glow-focus unchanged.",
  },
  {
    version: "0.9.0",
    date: "Aug 28, 2026",
    title: "Calendar & chart patterns",
    status: "New" as const,
    body: "Higher-level calendar and chart compositions built from base Paubha components.",
  },
  {
    version: "0.8.4",
    date: "Aug 12, 2026",
    title: "Breadcrumbs focus fix",
    status: "Fixed" as const,
    body: "Restored shadow-glow-focus on breadcrumb links so keyboard users get the signature ring.",
  },
] as const;

const statusVariant = {
  New: "brand",
  Improved: "success",
  Fixed: "warning",
} as const;

export function ChangelogMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-8">
        <Badge variant="gray" fill="subtle" size="md">
          Changelog
        </Badge>
        <h1 className="mt-4 text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
          What we shipped
        </h1>
        <p className="mt-3 text-body-md text-fg-secondary">
          Weekly notes from the Paubha team. Components, patterns, and fixes,
          no fluff.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <ActivityFeed className="gap-0">
          {ENTRIES.map((entry, i) => (
            <ActivityFeedTimelineItem
              key={entry.version}
              title={
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{entry.title}</span>
                  <Badge
                    variant={statusVariant[entry.status]}
                    fill="subtle"
                    size="sm"
                  >
                    {entry.status}
                  </Badge>
                </span>
              }
              timestamp={`${entry.version} · ${entry.date}`}
              status={
                <p className="text-body-sm text-fg-secondary">{entry.body}</p>
              }
              last={i === ENTRIES.length - 1}
            />
          ))}
        </ActivityFeed>

        <Divider className="my-10" />
        <p className="text-center text-ui-sm text-fg-tertiary">
          Older releases live on GitHub. Open an issue if you need a specific
          build note.
        </p>
      </section>
    </MarketingShell>
  );
}
