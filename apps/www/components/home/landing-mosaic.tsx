"use client";

import { cn } from "@paubha/registry/lib/cn";
import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { Button } from "@paubha/registry/ui/button";
import { Divider } from "@paubha/registry/ui/divider";
import { Field } from "@paubha/registry/ui/field";
import { Input } from "@paubha/registry/ui/input";
import { ProgressBar } from "@paubha/registry/ui/progress-bar";
import { Switch } from "@paubha/registry/ui/switch";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageIcon,
} from "lucide-react";
import { ShowcaseCard } from "./showcase-card";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const CALENDAR_CELLS = [
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15, selected: true },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
  { day: 1, muted: true },
  { day: 2, muted: true },
];

const BARS = [
  { label: "Jan", value: 45 },
  { label: "Feb", value: 70 },
  { label: "Mar", value: 55 },
  { label: "Apr", value: 90 },
  { label: "May", value: 60 },
  { label: "Jun", value: 75 },
  { label: "Jul", value: 85 },
] as const;

const DONUT = [
  { label: "Direct", value: 43.5, color: "var(--brand-600)" },
  { label: "Organic Search", value: 28.5, color: "var(--success-600)" },
  { label: "Referral", value: 18.6, color: "var(--warning-600)" },
  { label: "Social", value: 9.4, color: "var(--gray-400)" },
] as const;

function donutGradient() {
  let cursor = 0;
  return DONUT.map((slice) => {
    const start = cursor;
    cursor += (slice.value / 100) * 360;
    return `${slice.color} ${start}deg ${cursor}deg`;
  }).join(", ");
}

function CalendarCard() {
  return (
    <ShowcaseCard className="flex flex-col gap-4">
      <div>
        <p className="text-ui-lg font-semibold text-fg-primary">
          Schedule Meeting
        </p>
        <p className="mt-1 text-ui-sm text-fg-tertiary">
          Pick a date for the team standup.
        </p>
      </div>
      <div className="rounded-md border border-border-default p-4">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            className="flex size-7 items-center justify-center rounded-sm border border-border-default text-fg-secondary hover:bg-bg-secondary-hover focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <p className="text-ui-md font-medium text-fg-primary">October 2024</p>
          <button
            type="button"
            aria-label="Next month"
            className="flex size-7 items-center justify-center rounded-sm border border-border-default text-fg-secondary hover:bg-bg-secondary-hover focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((day) => (
            <span
              key={day}
              className="flex size-9 items-center justify-center text-ui-xs font-medium text-fg-tertiary"
            >
              {day}
            </span>
          ))}
          {CALENDAR_CELLS.map((cell, index) => (
            <span
              key={`${cell.day}-${index}`}
              className={cn(
                "flex size-9 items-center justify-center text-ui-sm",
                cell.selected
                  ? "rounded-full bg-bg-brand-solid font-medium text-fg-on-brand"
                  : cell.muted
                    ? "text-fg-disabled"
                    : "text-fg-primary",
              )}
            >
              {cell.day}
            </span>
          ))}
        </div>
      </div>
    </ShowcaseCard>
  );
}

function SparklineCard() {
  return (
    <ShowcaseCard className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-ui-sm text-fg-tertiary">Conversion Rate</p>
        <Badge variant="success" size="sm">
          Badge
          <ArrowUpRight className="size-3" aria-hidden="true" />
        </Badge>
      </div>
      <p className="text-display-xs font-semibold text-fg-primary">3.24%</p>
      <svg
        viewBox="0 0 260 48"
        className="h-12 w-full"
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M0 32 C20 30 32 28 48 26 C72 22 88 34 112 28 C136 22 152 18 176 20 C200 22 216 12 236 10 L260 8"
          stroke="var(--brand-600)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </ShowcaseCard>
  );
}

function DonutCard() {
  return (
    <ShowcaseCard className="flex flex-col items-center gap-6">
      <p className="w-full text-ui-md font-semibold text-fg-primary">
        Traffic Sources
      </p>
      <div className="relative size-[150px]">
        <div
          className="size-full rounded-full"
          style={{ background: `conic-gradient(${donutGradient()})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-bg-primary text-center">
          <p className="text-display-xs font-semibold text-fg-primary">2,847</p>
          <p className="text-ui-xs text-fg-tertiary">Total Visits</p>
        </div>
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {DONUT.map((slice) => (
          <li key={slice.label} className="flex items-center gap-1.5 text-ui-xs">
            <span
              className="size-2.5 rounded-xs"
              style={{ background: slice.color }}
              aria-hidden="true"
            />
            <span className="text-fg-secondary">{slice.label}</span>
            <span className="font-semibold text-fg-primary">{slice.value}%</span>
          </li>
        ))}
      </ul>
    </ShowcaseCard>
  );
}

function StatCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <ShowcaseCard className="gap-1 py-4">
        <p className="text-ui-sm text-fg-tertiary">Total Revenue</p>
        <p className="mt-1 text-display-xs font-semibold text-fg-primary">
          $48,250
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          <Badge variant="success" size="sm">
            Badge
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </Badge>
          <span className="text-ui-xs text-fg-tertiary">vs last month</span>
        </div>
      </ShowcaseCard>
      <ShowcaseCard className="gap-1 py-4">
        <p className="text-ui-sm text-fg-tertiary">Active Users</p>
        <p className="mt-1 text-display-xs font-semibold text-fg-primary">
          2,847
        </p>
        <p className="mt-3 flex items-center gap-1 text-ui-sm">
          <ArrowUpRight className="size-4 text-fg-success" aria-hidden="true" />
          <span className="font-medium text-fg-success">+8.2%</span>
          <span className="text-fg-tertiary">from last week</span>
        </p>
      </ShowcaseCard>
    </div>
  );
}

function BarChartCard() {
  return (
    <ShowcaseCard>
      <p className="mb-4 text-ui-md font-semibold text-fg-primary">
        Monthly Activity
      </p>
      <div className="flex h-44 gap-3">
        <div className="flex h-40 flex-col justify-between text-right text-ui-xs text-fg-tertiary">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="relative flex h-40 items-end justify-between gap-2">
            <div
              className="pointer-events-none absolute inset-0 flex flex-col justify-between"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-px w-full bg-border-default" />
              ))}
            </div>
            {BARS.map((bar) => (
              <div
                key={bar.label}
                className="relative z-10 flex h-full flex-1 flex-col items-center justify-end"
              >
                <div
                  className="w-[18px] rounded-t-sm bg-bg-brand-solid"
                  style={{ height: `${bar.value}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-center text-ui-xs text-fg-tertiary">
            {BARS.map((bar) => (
              <span key={bar.label} className="flex-1">
                {bar.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ShowcaseCard>
  );
}

function NotificationsCard() {
  const items = [
    { name: "Anna Chen", initials: "AC", text: "mentioned you in a comment", time: "2h ago", unread: true },
    { name: "Jordan Lee", initials: "JL", text: "invited you to a meeting", time: "4h ago", unread: true },
    { name: "Olivia Rhye", initials: "OR", text: "uploaded new design assets", time: "1d ago", unread: false },
  ];

  return (
    <ShowcaseCard className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-ui-md font-semibold text-fg-primary">Notifications</p>
        <Button variant="ghost" size="sm" className="text-fg-brand">
          Mark all read
        </Button>
      </div>
      <ul className="divide-y divide-border-default">
        {items.map((item) => (
          <li key={item.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <Avatar initials={item.initials} alt={item.name} size="sm" status="online" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-ui-md font-semibold text-fg-primary">
                {item.name} {item.text}
              </p>
              <p className="text-ui-sm text-fg-tertiary">{item.time}</p>
            </div>
            {item.unread ? (
              <span className="size-2 shrink-0 rounded-full bg-bg-brand-solid" aria-label="Unread" />
            ) : null}
          </li>
        ))}
      </ul>
    </ShowcaseCard>
  );
}

function FilesCard() {
  return (
    <ShowcaseCard>
      <p className="mb-4 text-ui-md font-semibold text-fg-primary">
        Uploading Files (3)
      </p>
      <div className="flex flex-col gap-3">
        <div className="rounded-sm border border-border-default bg-bg-secondary p-3">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-xs bg-bg-brand-subtle text-fg-brand">
              <FileText className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-ui-md font-medium text-fg-primary">
                Project_Specification_v2.pdf
              </p>
              <p className="text-ui-xs text-fg-tertiary">4.2 MB · 60% completed</p>
            </div>
          </div>
          <ProgressBar value={60} label="Uploading Project_Specification_v2.pdf" size="md" />
        </div>
        <div className="flex items-center gap-3 rounded-sm border border-border-default p-3">
          <span className="flex size-8 items-center justify-center rounded-xs bg-bg-brand-subtle text-fg-brand">
            <ImageIcon className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-ui-md font-medium text-fg-primary">
              homepage_hero_background.png
            </p>
            <p className="text-ui-xs font-semibold text-fg-success">
              1.8 MB · Uploaded successfully
            </p>
          </div>
        </div>
      </div>
    </ShowcaseCard>
  );
}

function SettingsCard() {
  return (
    <ShowcaseCard className="flex flex-col gap-6 p-8">
      <p className="text-display-xs font-semibold text-fg-primary">
        Account Settings
      </p>
      <div className="flex flex-col gap-4">
        <p className="text-ui-lg font-medium text-fg-primary">Profile</p>
        <Field label="Display name">
          <Input placeholder="Placeholder text" />
        </Field>
        <Field label="Email address">
          <Input type="email" placeholder="Placeholder text" />
        </Field>
        <Field label="Bio">
          <Input placeholder="Placeholder text" />
        </Field>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="text-ui-lg font-medium text-fg-primary">Notifications</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-ui-md font-medium text-fg-primary">Email notifications</p>
            <p className="text-ui-sm text-fg-tertiary">
              Receive email about account activity
            </p>
          </div>
          <Switch defaultChecked aria-label="Email notifications" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-ui-md font-medium text-fg-primary">Marketing emails</p>
            <p className="text-ui-sm text-fg-tertiary">
              Receive emails about new features
            </p>
          </div>
          <Switch aria-label="Marketing emails" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-ui-md font-medium text-fg-primary">Push notifications</p>
            <p className="text-ui-sm text-fg-tertiary">
              Receive push notifications on your device
            </p>
          </div>
          <Switch defaultChecked aria-label="Push notifications" />
        </div>
      </div>
      <Divider />
      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="button">Done</Button>
      </div>
    </ShowcaseCard>
  );
}

function LineChartCard() {
  return (
    <ShowcaseCard>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-ui-md font-semibold text-fg-primary">
          Performance Metrics
        </p>
        <div className="flex items-center gap-3">
          <Switch defaultChecked aria-label="Compare previous period" />
          <span className="flex items-center gap-1.5 text-ui-xs text-fg-secondary">
            <span
              className="size-2 rounded-full bg-[var(--gray-400)]"
              aria-hidden="true"
            />
            Previous
          </span>
        </div>
      </div>
      <div className="flex h-44 gap-3">
        <div className="flex h-40 flex-col justify-between text-right text-ui-xs text-fg-tertiary">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>
        <div className="min-w-0 flex-1">
          <svg viewBox="0 0 400 160" className="h-40 w-full" aria-hidden="true">
            {[0, 40, 80, 120, 160].map((y) => (
              <line
                key={y}
                x1="0"
                x2="400"
                y1={y}
                y2={y}
                stroke="var(--border-default)"
              />
            ))}
            <polyline
              fill="none"
              stroke="var(--gray-400)"
              strokeDasharray="4 4"
              strokeWidth="2"
              points="0,110 66,95 132,120 198,70 264,85 330,55 400,48"
            />
            <polyline
              fill="none"
              stroke="var(--brand-600)"
              strokeWidth="2"
              strokeLinejoin="round"
              points="0,90 66,100 132,75 198,40 264,95 330,30 400,22"
            />
          </svg>
          <div className="mt-2 flex justify-between text-ui-xs text-fg-tertiary">
            {BARS.map((bar) => (
              <span key={bar.label}>{bar.label}</span>
            ))}
          </div>
        </div>
      </div>
    </ShowcaseCard>
  );
}

export function LandingMosaic() {
  return (
    <section
      aria-label="Component examples"
      className="relative z-10 overflow-x-clip px-4 pb-10 lg:px-6"
    >
      <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-[minmax(260px,354px)_minmax(0,1fr)_minmax(280px,520px)] lg:items-start">
        <div className="flex flex-col gap-4 lg:-ml-6">
          <CalendarCard />
          <SparklineCard />
          <div className="lg:-ml-16">
            <DonutCard />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <StatCards />
          <BarChartCard />
          <NotificationsCard />
          <FilesCard />
        </div>
        <div className="flex flex-col gap-4">
          <SettingsCard />
          <LineChartCard />
        </div>
      </div>
    </section>
  );
}
