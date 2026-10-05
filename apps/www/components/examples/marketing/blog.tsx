"use client";

import { Reveal } from "@/components/motion/reveal";
import { Avatar } from "@paubha/registry/ui/avatar";
import { Badge } from "@paubha/registry/ui/badge";
import { BlogCard } from "@paubha/registry/ui/blog-card";
import { Button, buttonVariants } from "@paubha/registry/ui/button";
import { Field } from "@paubha/registry/ui/field";
import { Input } from "@paubha/registry/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@paubha/registry/ui/tabs";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import { PEOPLE, Photo, type PhotoName } from "./photo";
import { MarketingShell } from "./shell";

type Post = {
  tag: string;
  title: string;
  excerpt: string;
  author: 0 | 1 | 2 | 3 | 4 | 5;
  date: string;
  photo: PhotoName;
};

const FEATURED: Post = {
  tag: "Engineering",
  title: "Building a date picker that waits for Apply",
  excerpt:
    "Most date pickers commit on every click. Ours holds the draft range until you press Apply, which made filters, tables and keyboard use a lot simpler.",
  author: 1,
  date: "Sep 30, 2026",
  photo: "laptop-code",
};

const LATEST: Post[] = [
  {
    tag: "Design systems",
    title:
      "Why we copy components into your repo instead of publishing a package",
    excerpt:
      "Owning the source means you can theme it, fork it and ship without waiting on a maintainer.",
    author: 4,
    date: "Sep 22, 2026",
    photo: "team-laptops",
  },
  {
    tag: "Design",
    title: "Mapping a sign-up flow on the wall before touching Figma",
    excerpt: "",
    author: 0,
    date: "Sep 18, 2026",
    photo: "ux-wall",
  },
  {
    tag: "Engineering",
    title: "Moving focus rings from outline to a 4px brand shadow",
    excerpt: "",
    author: 3,
    date: "Sep 9, 2026",
    photo: "code-closeup",
  },
  {
    tag: "Company",
    title: "What changed when our all-hands moved to written updates",
    excerpt: "",
    author: 5,
    date: "Aug 27, 2026",
    photo: "all-hands",
  },
];

const ALL: Post[] = [
  {
    tag: "Design systems",
    title:
      "Semantic tokens only: how we stopped hex values leaking into components",
    excerpt:
      "A short lint rule and a naming convention caught most of it. Review caught the rest.",
    author: 4,
    date: "Aug 20, 2026",
    photo: "desk-topdown",
  },
  {
    tag: "Engineering",
    title:
      "Testing every component with vitest-axe in open, error and disabled states",
    excerpt:
      "Accessibility checks run per state, not per component. Here is the test helper we use.",
    author: 1,
    date: "Aug 12, 2026",
    photo: "meeting-bw",
  },
  {
    tag: "Design",
    title:
      "Density that lines up: one height scale for buttons, inputs and selects",
    excerpt:
      "Five heights, one rule. Form rows stay aligned no matter which controls you mix.",
    author: 2,
    date: "Aug 4, 2026",
    photo: "discussion",
  },
  {
    tag: "Company",
    title: "Reviewing pull requests on a design system as a team of four",
    excerpt:
      "Our checklist for new components, from keyboard behavior to dark mode screenshots.",
    author: 3,
    date: "Jul 29, 2026",
    photo: "boardroom",
  },
];

const TOPICS = ["All", "Engineering", "Design", "Design systems", "Company"];

function Author({ post, className }: { post: Post; className?: string }) {
  const p = PEOPLE[post.author];
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Avatar src={p.src} alt={p.name} size="sm" />
      <div className="min-w-0">
        <p className="text-ui-sm font-semibold text-fg-primary">{p.name}</p>
        <p className="text-ui-xs text-fg-tertiary">{post.date}</p>
      </div>
    </div>
  );
}

function TagBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="gray" fill="subtle" size="sm">
      {children}
    </Badge>
  );
}

function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [done, setDone] = React.useState(false);

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          setError("Enter a valid email address.");
          setDone(false);
          return;
        }
        setError(undefined);
        setDone(true);
      }}
    >
      <Field
        label="Email"
        error={error}
        success={done ? "You are on the list." : undefined}
      >
        <Input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Button type="submit" className="self-start">
        Subscribe
      </Button>
    </form>
  );
}

export function BlogMarketingPage() {
  const [topic, setTopic] = React.useState("All");
  const shown = ALL.filter((p) => topic === "All" || p.tag === topic);
  const featuredAuthor = PEOPLE[FEATURED.author];

  return (
    <MarketingShell>
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <h1 className="max-w-2xl text-display-sm font-semibold tracking-[-0.03em] text-fg-primary">
          Writing from the people who build Paubha
        </h1>
        <p className="mt-3 max-w-xl text-body-md text-fg-secondary">
          Engineering and design notes on components, tokens and accessibility.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10">
        <a
          href="#featured"
          id="featured"
          className="group block rounded-lg focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
        >
          <Photo
            name={FEATURED.photo}
            priority
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="aspect-[4/3] rounded-lg sm:aspect-[21/9]"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <TagBadge>{FEATURED.tag}</TagBadge>
              <h2 className="mt-3 text-display-xs font-semibold tracking-[-0.02em] text-fg-primary">
                {FEATURED.title}
              </h2>
              <p className="mt-3 max-w-2xl text-body-md text-fg-secondary">
                {FEATURED.excerpt}
              </p>
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <Avatar
                src={featuredAuthor.src}
                alt={featuredAuthor.name}
                size="md"
              />
              <div>
                <p className="text-ui-md font-semibold text-fg-primary">
                  {featuredAuthor.name}
                </p>
                <p className="text-ui-sm text-fg-tertiary">
                  {featuredAuthor.role}, {FEATURED.date}
                </p>
              </div>
            </div>
          </div>
        </a>
      </section>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pt-20">
          <h2 className="text-display-xs font-semibold text-fg-primary">
            Latest
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <BlogCard
              href="#latest-1"
              cover={
                <Photo
                  name={LATEST[0].photo}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="size-full"
                />
              }
              tag={<TagBadge>{LATEST[0].tag}</TagBadge>}
              title={LATEST[0].title}
              excerpt={LATEST[0].excerpt}
              meta={<Author post={LATEST[0]} />}
            />
            <ul className="flex flex-col gap-5">
              {LATEST.slice(1).map((post) => (
                <li key={post.title}>
                  <a
                    href="#latest"
                    className="group flex gap-4 rounded-md focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
                  >
                    <Photo
                      name={post.photo}
                      sizes="128px"
                      alt=""
                      className="aspect-square w-24 shrink-0 rounded-md sm:w-32"
                    />
                    <div className="flex min-w-0 flex-col justify-center gap-2">
                      <TagBadge>{post.tag}</TagBadge>
                      <p className="text-ui-lg font-semibold text-fg-primary group-hover:text-fg-brand">
                        {post.title}
                      </p>
                      <p className="text-ui-xs text-fg-tertiary">
                        {PEOPLE[post.author].name}, {post.date}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid items-center gap-8 overflow-hidden rounded-lg border border-border-default bg-bg-secondary md:grid-cols-[5fr_6fr]">
          <Photo
            name="all-hands"
            sizes="(min-width: 768px) 500px, 100vw"
            className="aspect-[16/10] md:aspect-auto md:h-full md:min-h-80"
          />
          <div className="px-6 pb-8 md:py-10 md:pr-10 md:pl-0">
            <h2 className="text-display-xs font-semibold tracking-[-0.02em] text-fg-primary">
              We build this in public
            </h2>
            <p className="mt-3 max-w-md text-body-md text-fg-secondary">
              Every component, token and decision lives in the open repo under
              the MIT license.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/dipendrashrest/paubha"
                className={buttonVariants({ variant: "primary", size: "md" })}
              >
                Star on GitHub
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-display-xs font-semibold text-fg-primary">
            All posts
          </h2>
          <Tabs value={topic} onValueChange={setTopic}>
            <div className="max-w-full overflow-x-auto">
              <TabsList variant="pill">
                {TOPICS.map((t) => (
                  <TabsTrigger key={t} value={t}>
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {shown.map((post) => (
            <BlogCard
              key={post.title}
              href="#post"
              cover={
                <Photo
                  name={post.photo}
                  sizes="(min-width: 640px) 540px, 100vw"
                  className="size-full"
                />
              }
              tag={<TagBadge>{post.tag}</TagBadge>}
              title={post.title}
              excerpt={post.excerpt}
              meta={<Author post={post} />}
            />
          ))}
          {shown.length === 0 ? (
            <p className="text-body-md text-fg-secondary">
              No posts in this topic yet.
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 rounded-lg border border-border-default bg-bg-secondary p-6 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-display-xs font-semibold tracking-[-0.02em] text-fg-primary">
              Get new posts by email
            </h2>
            <p className="mt-3 max-w-md text-body-md text-fg-secondary">
              One email when we publish. No release spam.
            </p>
          </div>
          <Newsletter />
        </div>
      </section>
    </MarketingShell>
  );
}
