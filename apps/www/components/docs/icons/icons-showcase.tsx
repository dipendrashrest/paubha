"use client";

import { CodeCopyButton } from "@/components/docs/_shared/docs-icon-button";
import { cn } from "@paubha/registry/lib/cn";
import { Badge } from "@paubha/registry/ui/badge";
import { Button, buttonVariants } from "@paubha/registry/ui/button";
import { FilterChip } from "@paubha/registry/ui/filter";
import { SearchField } from "@paubha/registry/ui/search-field";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  AtSign,
  BarChart3,
  Bell,
  Bookmark,
  Box,
  Boxes,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  Command,
  Copy,
  CreditCard,
  Database,
  Download,
  ExternalLink,
  Eye,
  File,
  Filter,
  Folder,
  Globe,
  Heart,
  Home,
  Inbox,
  Info,
  Key,
  Layers,
  LayoutGrid,
  Link2,
  Lock,
  type LucideIcon,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Package,
  Palette,
  PenTool,
  Plus,
  Search,
  Send,
  Settings,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  SwatchBook,
  Table,
  Tag,
  Terminal,
  Trash2,
  Type,
  Upload,
  User,
  Users,
  Zap,
} from "lucide-react";
import * as React from "react";

const LUCIDE_HOME = "https://lucide.dev";
const LUCIDE_ICONS = "https://lucide.dev/icons";
const LUCIDE_REACT = "https://lucide.dev/guide/packages/lucide-react";

type Category = "All" | "Actions" | "Nav" | "System" | "Content" | "Brand";

type CatalogItem = {
  name: string;
  Icon: LucideIcon;
  category: Exclude<Category, "All">;
};

const CATALOG: CatalogItem[] = [
  { name: "ArrowRight", Icon: ArrowRight, category: "Nav" },
  { name: "ChevronRight", Icon: ChevronRight, category: "Nav" },
  { name: "ChevronDown", Icon: ChevronDown, category: "Nav" },
  { name: "Home", Icon: Home, category: "Nav" },
  { name: "Menu", Icon: Menu, category: "Nav" },
  { name: "ExternalLink", Icon: ExternalLink, category: "Nav" },
  { name: "Globe", Icon: Globe, category: "Nav" },
  { name: "Link2", Icon: Link2, category: "Nav" },
  { name: "Search", Icon: Search, category: "Actions" },
  { name: "Plus", Icon: Plus, category: "Actions" },
  { name: "Copy", Icon: Copy, category: "Actions" },
  { name: "Check", Icon: Check, category: "Actions" },
  { name: "Download", Icon: Download, category: "Actions" },
  { name: "Upload", Icon: Upload, category: "Actions" },
  { name: "Send", Icon: Send, category: "Actions" },
  { name: "Trash2", Icon: Trash2, category: "Actions" },
  { name: "Filter", Icon: Filter, category: "Actions" },
  { name: "SlidersHorizontal", Icon: SlidersHorizontal, category: "Actions" },
  { name: "Settings", Icon: Settings, category: "System" },
  { name: "Lock", Icon: Lock, category: "System" },
  { name: "Key", Icon: Key, category: "System" },
  { name: "Shield", Icon: Shield, category: "System" },
  { name: "Eye", Icon: Eye, category: "System" },
  { name: "Bell", Icon: Bell, category: "System" },
  { name: "Command", Icon: Command, category: "System" },
  { name: "Terminal", Icon: Terminal, category: "System" },
  { name: "Database", Icon: Database, category: "System" },
  { name: "AlertCircle", Icon: AlertCircle, category: "System" },
  { name: "Info", Icon: Info, category: "System" },
  { name: "Sun", Icon: Sun, category: "System" },
  { name: "Moon", Icon: Moon, category: "System" },
  { name: "User", Icon: User, category: "Content" },
  { name: "Users", Icon: Users, category: "Content" },
  { name: "Mail", Icon: Mail, category: "Content" },
  { name: "Inbox", Icon: Inbox, category: "Content" },
  { name: "MessageSquare", Icon: MessageSquare, category: "Content" },
  { name: "Calendar", Icon: Calendar, category: "Content" },
  { name: "Clock", Icon: Clock, category: "Content" },
  { name: "File", Icon: File, category: "Content" },
  { name: "Folder", Icon: Folder, category: "Content" },
  { name: "Table", Icon: Table, category: "Content" },
  { name: "Bookmark", Icon: Bookmark, category: "Content" },
  { name: "Tag", Icon: Tag, category: "Content" },
  { name: "AtSign", Icon: AtSign, category: "Content" },
  { name: "CreditCard", Icon: CreditCard, category: "Content" },
  { name: "Camera", Icon: Camera, category: "Content" },
  { name: "Type", Icon: Type, category: "Brand" },
  { name: "Palette", Icon: Palette, category: "Brand" },
  { name: "SwatchBook", Icon: SwatchBook, category: "Brand" },
  { name: "PenTool", Icon: PenTool, category: "Brand" },
  { name: "Sparkles", Icon: Sparkles, category: "Brand" },
  { name: "Zap", Icon: Zap, category: "Brand" },
  { name: "Star", Icon: Star, category: "Brand" },
  { name: "Heart", Icon: Heart, category: "Brand" },
  { name: "Activity", Icon: Activity, category: "Brand" },
  { name: "BarChart3", Icon: BarChart3, category: "Brand" },
  { name: "LayoutGrid", Icon: LayoutGrid, category: "Brand" },
  { name: "Layers", Icon: Layers, category: "Brand" },
  { name: "Box", Icon: Box, category: "Brand" },
  { name: "Boxes", Icon: Boxes, category: "Brand" },
  { name: "Package", Icon: Package, category: "Brand" },
  { name: "Code2", Icon: Code2, category: "Brand" },
  { name: "Circle", Icon: Circle, category: "Brand" },
];

const CATEGORIES: Category[] = [
  "All",
  "Actions",
  "Nav",
  "System",
  "Content",
  "Brand",
];

function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduce;
}

export function IconsHero() {
  const reduce = usePrefersReducedMotion();
  const [drawn, setDrawn] = React.useState(reduce);

  React.useEffect(() => {
    if (reduce) {
      setDrawn(true);
      return;
    }
    setDrawn(false);
    const id = window.setTimeout(() => setDrawn(true), 80);
    return () => window.clearTimeout(id);
  }, [reduce]);

  return (
    <div className="not-prose relative overflow-hidden rounded-lg border border-border-default bg-bg-secondary">
      <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-8">
        <div className="pb-enter">
          <Badge variant="brand" fill="subtle" size="md">
            Official set
          </Badge>
          <h2 className="mt-4 text-balance text-display-xs font-semibold tracking-[-0.03em] text-fg-primary">
            Paubha uses Lucide. Only Lucide.
          </h2>
          <p className="mt-3 max-w-[42ch] text-body-md text-fg-secondary">
            Same glyphs as the Figma file. Tree-shaken from{" "}
            <code className="font-mono text-ui-sm">lucide-react</code>. No
            second family, no hand-rolled paths.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={LUCIDE_ICONS}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "primary", size: "md" }),
                "pb-press",
              )}
            >
              Browse Lucide
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <a
              href={LUCIDE_REACT}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "md" }),
                "pb-press",
              )}
            >
              React guide
            </a>
          </div>
        </div>
        <div className="pb-enter-late grid grid-cols-4 gap-3">
          {[
            Sparkles,
            PenTool,
            Command,
            Shield,
            Calendar,
            Search,
            Zap,
            Boxes,
          ].map((Icon, i) => (
            <div
              key={Icon.displayName ?? i}
              data-drawn={drawn ? "true" : "false"}
              className="pb-icon-draw flex aspect-square items-center justify-center rounded-md border border-border-default bg-bg-primary text-fg-brand"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IconsShowcase() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<Category>("All");
  const [selected, setSelected] = React.useState<CatalogItem>(
    CATALOG[0] as CatalogItem,
  );
  const [size, setSize] = React.useState(24);
  const [stroke, setStroke] = React.useState(1.75);
  const [copied, setCopied] = React.useState<"name" | "import" | null>(null);
  const resetRef = React.useRef<number | undefined>(undefined);
  const reduce = usePrefersReducedMotion();
  const [drawn, setDrawn] = React.useState(true);

  React.useEffect(() => {
    return () => window.clearTimeout(resetRef.current);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: `selected.name` replays the draw-in animation whenever the selection changes
  React.useEffect(() => {
    if (reduce) {
      setDrawn(true);
      return;
    }
    setDrawn(false);
    const id = window.setTimeout(() => setDrawn(true), 40);
    return () => window.clearTimeout(id);
  }, [selected.name, reduce]);

  const filtered = CATALOG.filter((item) => {
    const matchCat = category === "All" || item.category === category;
    const matchQ = item.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchCat && matchQ;
  });

  const importLine = `import { ${selected.name} } from "lucide-react";`;
  const jsxLine = `<${selected.name} className="size-5" strokeWidth={${stroke}} aria-hidden="true" />`;

  const copy = (kind: "name" | "import", text: string) => {
    void navigator.clipboard.writeText(text);
    setCopied(kind);
    window.clearTimeout(resetRef.current);
    resetRef.current = window.setTimeout(() => setCopied(null), 1400);
  };

  const SelectedIcon = selected.Icon;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border-default bg-bg-primary">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="border-b border-border-default p-4 lg:border-r lg:border-b-0">
          <SearchField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search icons"
            aria-label="Search Lucide icons"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={category === item}
                onClick={() => setCategory(item)}
              />
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="mt-8 text-body-sm text-fg-secondary">
              Nothing named like that here. The full set lives on{" "}
              <a
                href={LUCIDE_ICONS}
                className="text-fg-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
                target="_blank"
                rel="noreferrer"
              >
                lucide.dev/icons
              </a>
              .
            </p>
          ) : (
            <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {filtered.map((item) => {
                const Icon = item.Icon;
                const active = item.name === selected.name;
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelected(item)}
                      className={cn(
                        "pb-icon-cell flex w-full flex-col items-center gap-2 rounded-md border px-2 py-3",
                        "transition-[transform,background-color,border-color] duration-[160ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]",
                        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]",
                        active
                          ? "border-border-brand bg-bg-brand-subtle text-fg-brand"
                          : "border-border-default bg-bg-secondary text-fg-primary hover:border-border-strong hover:bg-bg-secondary-hover",
                      )}
                    >
                      <Icon
                        className="size-5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="w-full truncate text-center font-mono text-[11px] text-fg-tertiary">
                        {item.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <aside className="flex flex-col gap-5 bg-bg-secondary p-4">
          <div
            data-drawn={drawn ? "true" : "false"}
            className="pb-icon-draw flex min-h-36 items-center justify-center rounded-md border border-border-default bg-bg-primary text-fg-brand"
          >
            <SelectedIcon size={size} strokeWidth={stroke} aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-ui-sm font-medium text-fg-primary">
              {selected.name}
            </p>
            <p className="mt-1 text-ui-xs text-fg-tertiary">
              {selected.category} · lucide-react
            </p>
          </div>
          <label className="flex flex-col gap-2 text-ui-sm text-fg-secondary">
            Size {size}px
            <input
              type="range"
              min={16}
              max={48}
              step={4}
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="accent-[var(--brand-600)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-ui-sm text-fg-secondary">
            Stroke {stroke}
            <input
              type="range"
              min={1.25}
              max={2.25}
              step={0.25}
              value={stroke}
              onChange={(event) => setStroke(Number(event.target.value))}
              className="accent-[var(--brand-600)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
            />
          </label>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => copy("name", selected.name)}
            >
              {copied === "name" ? "Copied name" : "Copy name"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => copy("import", importLine)}
            >
              {copied === "import" ? "Copied import" : "Copy import"}
            </Button>
          </div>
          <div className="relative rounded-md border border-border-default bg-bg-primary p-3">
            <CodeCopyButton
              getText={() => jsxLine}
              className="absolute top-2 right-2"
            />
            <pre className="overflow-x-auto pr-8 font-mono text-[11px] leading-relaxed text-fg-secondary">
              <code>{jsxLine}</code>
            </pre>
          </div>
          <a
            href={`${LUCIDE_ICONS}/${selected.name
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .replace(/([a-z])(\d)/g, "$1-$2")
              .toLowerCase()}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-ui-sm text-fg-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
          >
            Open on Lucide
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </aside>
      </div>
    </div>
  );
}

export function IconsUsage() {
  return (
    <div className="not-prose my-6 grid gap-3 md:grid-cols-2">
      <div className="rounded-lg border border-border-default bg-bg-secondary p-5">
        <p className="text-ui-md font-semibold text-fg-primary">
          In components
        </p>
        <p className="mt-2 text-body-sm text-fg-secondary">
          Import the named export. Pass it as a slot (
          <code className="font-mono text-ui-xs">leadingIcon</code>
          ). Mark decorative icons{" "}
          <code className="font-mono text-ui-xs">aria-hidden</code>.
        </p>
        <div className="mt-4">
          <Button size="md">
            Save
            <Check className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div className="rounded-lg border border-border-default bg-bg-secondary p-5">
        <p className="text-ui-md font-semibold text-fg-primary">Stroke lock</p>
        <p className="mt-2 text-body-sm text-fg-secondary">
          Default stroke is 1.75. Stay between 1.5 and 2. Color comes from{" "}
          <code className="font-mono text-ui-xs">currentColor</code>, so it
          follows <code className="font-mono text-ui-xs">fg-*</code> tokens.
        </p>
        <div className="mt-4 flex items-end gap-4 text-fg-brand">
          <Search strokeWidth={1.5} className="size-5" aria-hidden="true" />
          <Search strokeWidth={1.75} className="size-6" aria-hidden="true" />
          <Search strokeWidth={2} className="size-7" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export { LUCIDE_HOME, LUCIDE_ICONS, LUCIDE_REACT };
