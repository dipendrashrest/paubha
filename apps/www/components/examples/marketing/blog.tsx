"use client";

import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { BlogCard, BlogCardGrid } from "@paubha/registry/ui/blog-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@paubha/registry/ui/pagination";
import { MarketingShell } from "./shell";

const POSTS = [
  {
    tag: "Design systems",
    title: "Why copy-paste beats another npm UI kit",
    excerpt:
      "Owning the source means you can theme, fork, and ship without waiting on a package maintainers’ roadmap.",
    author: "Ava Ruiz",
    initials: "AR",
    date: "Sep 12, 2026",
  },
  {
    tag: "Engineering",
    title: "glow-focus: a focus ring that isn’t gray",
    excerpt:
      "How brand-tinted shadows became Paubha’s signature interactive state, and why outline-2 isn’t enough.",
    author: "Morgan Nia",
    initials: "MN",
    date: "Sep 5, 2026",
  },
  {
    tag: "Design",
    title: "Figma as the single source of truth",
    excerpt:
      "Variants and tokens live in the file first. Code follows, never the other way around.",
    author: "Jules Kim",
    initials: "JK",
    date: "Aug 28, 2026",
  },
  {
    tag: "Company",
    title: "How we ship an open-source registry",
    excerpt:
      "MIT, CLI installs, and weekly pattern drops: running a design system in public.",
    author: "Sam Lee",
    initials: "SL",
    date: "Aug 14, 2026",
  },
  {
    tag: "Product",
    title: "Application patterns: beyond the button",
    excerpt:
      "Page headers, empty states, and filters: higher-level compositions built from the same base kit.",
    author: "Tara Park",
    initials: "TP",
    date: "Aug 1, 2026",
  },
  {
    tag: "Customers",
    title: "How Helix unified three product UIs",
    excerpt:
      "A short case study on adopting Paubha tokens and components across marketing and app.",
    author: "Omar West",
    initials: "OW",
    date: "Jul 22, 2026",
  },
] as const;

const TAGS = [
  "All",
  "Design systems",
  "Engineering",
  "Design",
  "Company",
] as const;

export function BlogMarketingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <Badge variant="gray" fill="subtle" size="md">
          Blog
        </Badge>
        <h1 className="mt-4 text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
          Notes from the Paubha team
        </h1>
        <p className="mt-3 max-w-xl text-body-md text-fg-secondary">
          Design systems, React & Tailwind craft, and the occasional rant about
          generic UI kits.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {TAGS.map((tag, i) => (
            <Badge
              key={tag}
              variant={i === 0 ? "brand" : "gray"}
              fill={i === 0 ? "subtle" : "outline"}
              size="md"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <BlogCardGrid className="mx-auto max-w-6xl px-6 pb-12">
        {POSTS.map((post) => (
          <BlogCard
            key={post.title}
            tag={
              <Badge variant="gray" fill="subtle" size="sm">
                {post.tag}
              </Badge>
            }
            title={post.title}
            excerpt={post.excerpt}
            meta={
              <div className="flex items-center gap-2">
                <Avatar initials={post.initials} alt={post.author} size="sm" />
                <div className="min-w-0">
                  <p className="text-ui-sm font-semibold text-fg-primary">
                    {post.author}
                  </p>
                  <p className="text-ui-xs text-fg-tertiary">{post.date}</p>
                </div>
              </div>
            }
          />
        ))}
      </BlogCardGrid>

      <section className="mx-auto flex max-w-6xl justify-center px-6 pb-16">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </MarketingShell>
  );
}
