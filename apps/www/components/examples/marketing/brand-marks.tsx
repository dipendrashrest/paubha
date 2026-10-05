import { LogoCloudItem } from "@paubha/registry/ui/logo-cloud";
import type * as React from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Invented brands with simple geometric marks, drawn to match a wordmark's weight. */
const MARKS: { name: string; mark: React.ReactNode }[] = [
  {
    name: "Northwind",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" {...stroke} />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Helix",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6c8 0 8 12 16 12M4 18c8 0 8-12 16-12" {...stroke} />
      </svg>
    ),
  },
  {
    name: "Parcel",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" {...stroke} />
        <path d="M4 10h16M10 4v6" {...stroke} />
      </svg>
    ),
  },
  {
    name: "Orbit",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="4.5"
          transform="rotate(-30 12 12)"
          {...stroke}
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Kite",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.5 20 11l-8 10.5L4 11z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Summit",
    mark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 20 9 7l5 8 3-5 5 10z" fill="currentColor" />
      </svg>
    ),
  },
];

export function BrandMarks() {
  return (
    <>
      {MARKS.map((brand) => (
        <LogoCloudItem
          key={brand.name}
          name={brand.name}
          mark={brand.mark}
          className="gap-2 font-semibold tracking-tight"
        />
      ))}
    </>
  );
}
