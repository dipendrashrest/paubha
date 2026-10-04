# Paubha — CLAUDE.md

This file is auto-loaded by Claude Code every session. Read it before doing any work in this repo.

## What this is

**Paubha** — an open-source React + Tailwind component library, shadcn-style copy-paste distribution (not an npm-imported package). The full catalog ships free: 33 base components plus 27 application patterns (higher-level compositions built from the base components — activity feeds, tables, date pickers, calendars, dashboards, and more). Corrected 2026-08-25 — no paid tier; the earlier "free tier first (~28), paid tier later (complex patterns)" split was dropped. Design system lives in Figma; this repo is the code + docs site.

## Project links

- **Repo:** https://github.com/dipendrashrest/paubha
- **Issues:** https://github.com/dipendrashrest/paubha/issues
- **Live site (docs + registry API):** https://paubha.tech

Use these exactly — don't guess or reconstruct a repo URL from the package name. Corrected 2026-09-21 — custom domain is `paubha.tech` (docs + `/r/[name].json` registry endpoints). Keep `packages/registry/registry.json`'s `homepage`, the CLI's `components.json` `$schema`, and `DEFAULT_REGISTRY_URL` in `packages/cli/src/utils/registry.ts` pointed here together — don't let them drift apart.

## Brand identity — do not deviate without being told

- **Name:** Paubha · **Tagline:** "Open-source components for React & Tailwind"
- **Brand color:** true blue, `brand-600 = #2450EA` (keystone `brand-500 = #3B63F5`). Re-synced 2026-10-05 against the Paubha-UI file's Primitives collection; supersedes the 2026-09-11 `#2E4DD9` ramp.
- **Signature visual language** (what makes this NOT a generic Tailwind kit):
  1. **Brand-tinted shadows** — shadows use `brand-900` (`#1E3485`) instead of black, low opacity
  2. **`glow-focus`** — signature focus ring: 4px spread, `brand-500` @ 24%, zero blur/offset. Every interactive component's focus state uses this. Not a hard 2px outline. This is non-negotiable — it's the whole point of the brand.
  3. **Squircle-leaning radius** — softer/larger than typical: 4/8/12/16/20px steps
  4. Role-based type naming: `ui-*`, `body-*`, `display-*` (not generic sm/md/lg for type)
  5. `space-2xs` (2px) micro-spacing tier most systems skip

## Design tokens — confirmed real values, do not invent or approximate

Re-synced 2026-10-05 against the Paubha-UI file's local variable collections (Primitives, Semantic Light/Dark, Spacing, Grid) and effect styles — every value below is read straight from Figma, not derived. Supersedes all earlier "corrected" values (`#2E4DD9` brand, cool `#101828` gray family).

```css
--brand-50: #EFF4FF;  --brand-100: #DBE5FE; --brand-200: #BFD0FE;
--brand-300: #93B0FD; --brand-400: #6187F9; --brand-500: #3B63F5;
--brand-600: #2450EA; --brand-700: #1C3FD1; --brand-800: #1E37A9;
--brand-900: #1E3485; --brand-950: #172152;

/* Gray — true neutral; 875/925 are elevated dark-surface steps */
--gray-50: #FAFAFA;  --gray-100: #F5F5F5; --gray-200: #E5E5E5;
--gray-300: #D4D4D4; --gray-400: #A3A3A3; --gray-500: #737373;
--gray-600: #525252; --gray-700: #404040; --gray-800: #262626;
--gray-875: #1C1C1C; --gray-900: #171717; --gray-925: #111111;
--gray-950: #0A0A0A;

/* Error / Warning / Success / Info — full 50–950 ramps exist in Figma;
   see tokens.css. Keys: */
--error-500: #F04438; --error-600: #D92D20;
--warning-600: #DC6803; --success-600: #058550; --info-600: #2551E0;
```

**Never approximate a hex value. If it's not confirmed in Figma, stop and ask rather than guessing.**

**Semantic tokens (components use ONLY these, never primitives directly):**
`bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-elevated`, `bg-preview`, `bg-overlay`, `bg-brand-solid`, `bg-brand-solid-hover`, `bg-brand-solid-active`, `bg-brand-subtle`, `bg-disabled`, `bg-secondary-hover`, `bg-tertiary-hover`, `bg-switch-off`, `bg-error-solid`, `bg-error-solid-hover`, `bg-error-solid-active`, `bg-error-subtle`, `bg-warning-solid`, `bg-warning-subtle`, `bg-success-solid`, `bg-success-subtle`, `bg-info-solid`, `bg-info-subtle`, `fg-primary`, `fg-secondary`, `fg-tertiary`, `fg-disabled`, `fg-on-brand`, `fg-on-error`, `fg-on-warning`, `fg-on-success`, `fg-on-info`, `fg-brand`, `fg-link`, `fg-error`, `fg-warning`, `fg-success`, `fg-info`, `border-default`, `border-strong`, `border-disabled`, `border-brand`, `border-error`, `border-warning`, `border-success`, `border-info`, `focus-ring`, `focus-ring-error`.

Both Light and Dark mode mappings exist in `packages/registry/styles/tokens.css` (edit the `.dark` block, then `pnpm sync:tokens` regenerates the `prefers-color-scheme` copy) — always bind to the semantic layer, never hardcode a primitive hex inside a component. Dark surfaces follow Figma's gray steps (`bg-primary` gray-950 · `bg-secondary` gray-925 · `bg-tertiary` gray-900 · `bg-elevated` gray-875); dark `*-subtle` backgrounds are the 500 step at 14% alpha. `bg-preview` (`#F8F9FB` / `#16161A`) is code-only, for `ComponentPlayground`'s preview pane.

**Spacing:** 4px base scale, `space-0` through `space-10xl`, plus micro tier `space-px` (1px) and `space-2xs` (2px).
**Radius:** `radius-none` 0 (unused so far) · `radius-xs` 4 (checkboxes, dropdown/menu items, tooltips) · `radius-sm` 8 (buttons, inputs, textareas, select, tag input) · `radius-md` 12 (cards, dialogs, popovers, dropdown/select panels) · `radius-lg` 16 (modals, alerts, toasts) · `radius-xl` 20 (unused so far) · `radius-full` 9999 (pills, avatars, switches, radio/checkbox indicators). Corrected 2026-09-11 — Figma's file had two duplicate "Radius" variable collections with conflicting values; once consolidated (see SYNC_LOG.md), the real bound-variable scale turned out to be `none/xs/sm/md/lg/xl/full = 0/4/8/12/16/20/9999`, not the previous `6/8/10/14/20/9999` guess. `radius-sm` (8) and `radius-xl` (20) were already correct; `xs`, `md`, and `lg` all shifted.
**Density (form-row components must align):** `sm` = 32px height · `md` = 40px · `lg` = 48px · `xl` = 56px · `2xl` = 64px. Button, Input, Select follow this exactly; Textarea uses it as min-height basis. Input (re-synced 2026-10-05; the old 36/40/44/48 exception is gone): padding 12/12/12/16/32px, icon 16/20/20/24/—, text body-sm/body-sm/body-md/body-md/ui-lg.
**Breakpoints/Grid:** Tailwind v4 `--breakpoint-*` tokens in `theme.css` — `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536, from Figma's Grid collection (2026-10-05; `2xl` now exists there). Same collection gives columns (`--grid-columns-mobile: 4` · `-tablet: 8` · `-desktop: 12`), margins (16/24/32px) and gutters (12/16/24px) as `--grid-*` in `tokens.css`. No component consumes the grid tokens yet.

## Component API conventions — locked, follow exactly

- Extend native elements, forward refs: `React.ComponentPropsWithRef<"button">`
- Variants via **CVA** (`class-variance-authority`) + `cn()` helper (`clsx` + `tailwind-merge`)
- Component property naming: `Variant` (capitalized values: Primary/Secondary/etc.) · `Size` (lowercase: sm/md/lg/xl) · `State` (lowercase: default/hover/focus/active/disabled/loading) · booleans camelCase (`showIcon`, `dismissible`) · instance-swap slots camelCase (`leadingIcon`, `avatar`)
- **Every interactive component must have a `focus` state using `shadow-glow-focus`** — not a generic outline. If a component ships without this, it's incomplete.
- Composition over configuration for multi-part components (`<Dialog><DialogTrigger/><DialogContent/></Dialog>`, not a giant prop bag)
- Controlled + uncontrolled always both: `value`/`defaultValue`/`onValueChange` naming pattern
- `className` always wins (tailwind-merge handles collisions)
- `asChild` pattern for polymorphism (Radix/Base UI `Slot`), not an `as` prop
- Complex overlays (Dialog, Select, Dropdown, Tooltip, Popover, Accordion, Switch, Checkbox, Slider, Toast) build on **Base UI or Radix primitives** — don't reinvent focus trapping/positioning/typeahead from scratch
- Simple components (Button, Badge, Avatar, Alert, Card, Divider, Skeleton) built from scratch — no dependency needed

## Icons

**Lucide only** (`lucide-react`). Same set as the Figma file. Never mix in another icon library.

## Repo structure (pnpm + Turborepo monorepo)

```
paubha/
├── apps/
│   └── www/                 # docs site — Next.js + Fumadocs + MDX
│       └── public/r/        # built registry JSON (from packages/registry#build)
├── packages/
│   ├── cli/                 # npx paubha (init, add) — fetches /r/*.json
│   └── registry/
│       ├── ui/              # one folder per component (e.g. ui/avatar/avatar.tsx)
│       ├── lib/             # cn(), shared hooks
│       ├── styles/          # tokens.css + theme.css (SSOT)
│       ├── registry.json
│       └── scripts/build-registry.mjs
├── package.json
├── turbo.json
└── CLAUDE.md                # this file
```

## Tooling

- **Package manager:** pnpm (never npm/yarn in this repo)
- **Build:** Turborepo; `pnpm build:registry` emits `apps/www/public/r/*.json`; tsup for the CLI
- **Lint/format:** Biome (not ESLint+Prettier — pick one, this is it)
- **Testing:** Vitest + Testing Library + vitest-axe (accessibility checks are mandatory per component, not optional)
- **TypeScript:** strict mode, always
- **Styling:** Tailwind v4, CSS-first `@theme` config — no `tailwind.config.js`
- **URL guard:** `pnpm check` runs `scripts/check-urls.mjs`, which fails on any link to a path under `ui.paubha.tech` (that host only serves the separate private marketing homepage, so every path under it 404s — canonical docs are `paubha.tech/docs/*`) and on drift between the four places that hardcode the site URL (`registry.json` `homepage`, `packages/cli/package.json` `homepage`, `schema.json` `$id`, `DEFAULT_REGISTRY_URL`, `components.json` `$schema`). A bare `ui.paubha.tech` mention in prose is allowed. If a 404 is reported for a `ui.paubha.tech` URL and this check passes, the bad link is in the marketing repo, not here.

## Distribution model

shadcn-style copy-paste registry (`npx paubha@latest add button`), NOT an npm-imported package. CLI fetches `{registry}/button.json` (default `https://paubha.tech/r` — see "Project links" above). Local/dev override: `PAUBHA_REGISTRY_URL` or `components.json` `registry` field. Public MIT-licensed repo, single free registry — no separate paid-tier registry (see "What this is" above). Published to npm as `paubha` — use `npx paubha@latest`.

**`init` wires the global CSS itself** (added 2026-09-22) — it finds the project's global stylesheet (`app/globals.css`, `src/app/globals.css`, `src/index.css`, … preferring one that already imports Tailwind), inserts the `tokens.css`/`theme.css` `@import`s immediately after the last Tailwind import line at the correct relative depth, and persists the file it chose as `tailwind.css` in `components.json`. It's idempotent, and an existing import at a different depth still counts as present. This is no longer a manual step — don't reintroduce "one more step" instructions in the docs. Logic lives in `packages/cli/src/utils/css.ts`; when changing it, update `apps/www/content/docs/installation.mdx`, `apps/www/content/docs/cli.mdx`, and `packages/cli/README.md` together.

**Registry item names are NOT file paths.** Several items share one source file: `select-v2`'s only file is `ui/select/select.tsx`, the same file `select` ships, because `SelectV2` is defined alongside `Select` in it (same for `accordion-v2`, `popover-v2`, `pagination-v2`, `tag-input-v2`). Never derive an import path or a symbol name from an item's name — `add` derives both from the item's real `registry:ui` file path plus `meta.exports`, which `build-registry.mjs` generates by scanning the source's top-level PascalCase `export const`/`export function` declarations and splitting them on the `V2` suffix (`-v2` items keep only `*V2`; base items drop them). The build fails if any item resolves to zero exports. Keep that suffix convention when adding a variant, or give it its own folder.

## Where specs come from

**Figma is the single source of truth for every component's variants/states/tokens.** Before building or modifying a component, pull its real spec via the Figma MCP connection (may be rate-limited — check before assuming a spec is complete). Never invent variants, sizes, or states that aren't confirmed in Figma. If Figma access is unavailable, stop and ask rather than guessing — flag exactly what's missing.

**File:** [Paubha-UI](https://www.figma.com/design/7JhwsjEdCg2grQsRnK24NF/Paubha-UI) · file key `7JhwsjEdCg2grQsRnK24NF` (replaced the old `CDgfoMkj7lP3pXWJ3aOgkH` file on 2026-10-05). Read access is via the `dipendra.shrestha@velorona.com` Figma account.

## Accessibility — non-negotiable per component

Every interactive component needs: correct ARIA role, documented keyboard behavior (follow WAI-ARIA APG patterns exactly), visible focus state (`shadow-glow-focus`), and a vitest-axe test with zero violations across states (open, error, disabled). Write the accessibility note as a short comment/doc block on every component, matching the style already established in Figma component pages (e.g. Button: "role=button · Enter/Space activates · focus ring visible on Tab · disabled prevents interaction · loading announces via aria-busy").

## Current status (update this section as work progresses)

- Figma foundations: done (Colors, Typography & Spacing, Depth & Shape, Icons, Grid Layouts)
- Figma: Paubha-UI has 40 base component pages (Actions & Navigation, Inputs, Selection, Feedback & Status, Overlays & Display) plus ~55 application-pattern pages and 3 marketing pages.
- Code: 69 registry items in `packages/registry/ui`, each with a vitest-axe test file and a `registry.json` entry. Tokens live in `packages/registry/styles/`. `pnpm build:registry` emits shadcn-format JSON to `apps/www/public/r/`. CLI (`packages/cli`) has working `init` and `add` that **fetch** from the registry URL (default `https://paubha.tech/r`; override with `PAUBHA_REGISTRY_URL` or `components.json` `registry`).
- Docs site: Introduction/Installation/Theming/CLI pages exist; component-doc-page template proven on Avatar. Not yet wired to the real components built above — `apps/www/content/docs/components/*.mdx` still predates them and needs a pass to hook up live previews/prop tables (tracked as the next phase).

## Working style

Direct and practical, build-as-we-go. Don't over-explain settled decisions above — they're settled. If something in this file conflicts with a new instruction, flag the conflict and ask rather than silently picking one.

