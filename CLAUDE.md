# Paubha — CLAUDE.md

This file is auto-loaded by Claude Code every session. Read it before doing any work in this repo.

## What this is

**Paubha** — an open-source React + Tailwind component library, shadcn-style copy-paste distribution (not an npm-imported package). The full catalog ships free: 33 base components plus 27 application patterns (higher-level compositions built from the base components — activity feeds, tables, date pickers, calendars, dashboards, and more). Corrected 2026-08-25 — no paid tier; the earlier "free tier first (~28), paid tier later (complex patterns)" split was dropped. Design system lives in Figma; this repo is the code + docs site.

## Project links

- **Repo:** https://github.com/dipendra0514/paubha
- **Issues:** https://github.com/dipendra0514/paubha/issues
- **Live site (docs + registry API):** https://paubha.vercel.app

Use these exactly — don't guess or reconstruct a repo URL from the package name. Corrected 2026-08-25 — no custom domain is owned yet, so `paubha.com`/`docs.paubha.com` (the earlier planned marketing/docs split) don't exist and don't resolve. Until a domain is bought, both the docs site and the `/r/[name].json` registry-JSON endpoints are served from the single Vercel deployment above (`packages/registry/registry.json`'s `homepage`, the CLI's `components.json` `$schema`, and `DEFAULT_REGISTRY_URL` in `packages/cli/src/utils/registry.ts` all point here). If a real domain is bought later, update all of those together — don't let them drift apart again.

## Brand identity — do not deviate without being told

- **Name:** Paubha · **Tagline:** "Open-source components for React & Tailwind"
- **Brand color:** true blue, `brand-600 = #2450EA`. Corrected 2026-08-22 from an earlier indigo-leaning blue (`#4658DE`) that read too purple — see BUILD_LOG.md for the full before/after scale and contrast verification.
- **Signature visual language** (what makes this NOT a generic Tailwind kit):
  1. **Brand-tinted shadows** — shadows use `brand-900` (`#1E3485`) instead of black, low opacity
  2. **`glow-focus`** — signature focus ring: 4px spread, `brand-500` @ 24%, zero blur/offset. Every interactive component's focus state uses this. Not a hard 2px outline. This is non-negotiable — it's the whole point of the brand.
  3. **Squircle-leaning radius** — softer/larger than typical: 6/8/10/14/20px steps
  4. Role-based type naming: `ui-*`, `body-*`, `display-*` (not generic sm/md/lg for type)
  5. `space-2xs` (2px) micro-spacing tier most systems skip

## Design tokens — confirmed real values, do not invent or approximate

```css
/* Brand */
--brand-50: #EFF4FF;  --brand-100: #DBE5FE; --brand-200: #BFD0FE;
--brand-300: #93B0FD; --brand-400: #6187F9; --brand-500: #3B63F5;
--brand-600: #2450EA; --brand-700: #1C3FD1; --brand-800: #1E37A9;
--brand-900: #1E3485; --brand-950: #172152;

/* Gray */
--gray-50: #F9FAFB;  --gray-100: #F2F4F7; --gray-200: #E4E7EC;
--gray-300: #D0D5DD; --gray-400: #98A2B3; --gray-500: #667085;
--gray-600: #475467; --gray-700: #344054; --gray-800: #1D2939;
--gray-900: #101828; --gray-950: #0C111D;

/* Error */
--error-50: #FEF3F2;  --error-600: #D92D20; --error-950: #55160C;
/* Warning */
--warning-50: #FFFAEB; --warning-600: #DC6803; --warning-950: #4E1D09;
/* Success */
--success-50: #ECFDF3; --success-600: #079455; --success-950: #053321;
```

Full 50–950 steps for error/warning/success exist in Figma "Foundations / Colors" — pull exact intermediate values from there via the Figma MCP connection before hardcoding a step not listed above. **Never approximate a hex value. If it's not confirmed, stop and ask rather than guessing.**

**Semantic tokens (components use ONLY these, never primitives directly):**
`bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-elevated`, `bg-preview`, `bg-brand-solid`, `bg-brand-solid-hover`, `bg-brand-solid-active`, `bg-brand-subtle`, `bg-disabled`, `bg-secondary-hover`, `bg-tertiary-hover`, `bg-switch-off`, `bg-error-solid`, `bg-error-solid-hover`, `bg-error-subtle`, `bg-warning-solid`, `bg-warning-subtle`, `bg-success-solid`, `bg-success-subtle`, `fg-primary`, `fg-secondary`, `fg-tertiary`, `fg-disabled`, `fg-on-brand`, `fg-on-error`, `fg-on-warning`, `fg-on-success`, `fg-brand`, `fg-error`, `fg-warning`, `fg-success`, `border-default`, `border-strong`, `border-brand`, `border-error`, `border-warning`, `border-success`, `focus-ring`.

Both Light and Dark mode mappings exist in `packages/registry/styles/tokens.css` — always bind to the semantic layer, never hardcode a primitive hex inside a component.

**Dark-mode `bg-*` overhaul (2026-08-25):** `bg-primary`/`bg-secondary`/`bg-tertiary`/`bg-elevated` in dark mode moved off the `--gray-950`-`--gray-800` primitive scale to warmer, elevated literal values — `#0A0A0B` / `#111113` / `#18181B` / `#1C1C1F` respectively — so components don't disappear into a flat dark page. A new `bg-preview` semantic token (`#F8F9FB` light / `#16161A` dark) exists specifically for component-preview frames (`ComponentPlayground`'s preview pane) so previewed components stay visually distinct from the page background in both modes. This decouples those four dark `bg-*` tokens from the Gray primitive scale — they're literal values now, not `var(--gray-950)` etc. `--gray-950` itself (`#0C111D`) is unchanged and still used elsewhere (dark `fg-disabled`, `bg-disabled`, etc.).

**Spacing:** 4px base scale, `space-0` through `space-10xl`, plus micro tier `space-px` (1px) and `space-2xs` (2px).
**Radius:** `radius-xs` 6 (checkboxes, dropdown/menu items, tooltips) · `radius-sm` 8 (buttons, inputs, textareas, alerts) · `radius-md` 10 (dropdown/menu panels) · `radius-lg` 14 (modals) · `radius-xl` 20 (unused so far) · `radius-full` 9999 (pills, avatars, switches, radio/checkbox indicators). Corrected 2026-08-23 against the real Figma specs pulled while building all 19 free-tier components — the previous "(inputs/buttons)" on `radius-md` and "(modals)" on `radius-xl` didn't match what Figma actually specifies (buttons/inputs are `radius-sm`; modals are `radius-lg`).
**Density (form-row components must align):** `sm` = 32px height · `md` = 40px · `lg` = 48px · `xl` = 56px. Button, Textarea (min-height), Select follow this exactly. **Input is the one exception** (corrected 2026-08-25 against the real Figma component set, which publishes its own fixed heights): `sm` = 36px · `md` = 40px · `lg` = 44px · `xl` = 48px — only `md` lines up with the shared scale. Horizontal padding and icon size scale alongside it (`sm`: 12px padding/16px icon · `md`: 12px/20px · `lg`: 14px/20px · `xl`: 16px/20px), all read directly off Figma's published symbols (node `6198:22642`), not derived from the shared density formula.

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

## Distribution model

shadcn-style copy-paste registry (`npx paubha add button`), NOT an npm-imported package. CLI fetches `{registry}/button.json` (default `https://paubha.vercel.app/r` — see "Project links" above for why). Local/dev override: `PAUBHA_REGISTRY_URL` or `components.json` `registry` field. Public MIT-licensed repo, single free registry — no separate paid-tier registry (see "What this is" above). **Not yet published to npm** — `npx paubha@latest` won't resolve to anything until it is.

## Where specs come from

**Figma is the single source of truth for every component's variants/states/tokens.** Before building or modifying a component, pull its real spec via the Figma MCP connection (may be rate-limited — check before assuming a spec is complete). Never invent variants, sizes, or states that aren't confirmed in Figma. If Figma access is unavailable, stop and ask rather than guessing — flag exactly what's missing.

**File:** [Dipendra-Testing (Copy) (Copy)](https://www.figma.com/design/CDgfoMkj7lP3pXWJ3aOgkH/Dipendra-Testing--Copy---Copy-) · file key `CDgfoMkj7lP3pXWJ3aOgkH`

## Accessibility — non-negotiable per component

Every interactive component needs: correct ARIA role, documented keyboard behavior (follow WAI-ARIA APG patterns exactly), visible focus state (`shadow-glow-focus`), and a vitest-axe test with zero violations across states (open, error, disabled). Write the accessibility note as a short comment/doc block on every component, matching the style already established in Figma component pages (e.g. Button: "role=button · Enter/Space activates · focus ring visible on Tab · disabled prevents interaction · loading announces via aria-busy").

## Current status (update this section as work progresses)

- Figma foundations: done (Colors, Typography & Spacing, Depth & Shape, Icons, Grid Layouts)
- Figma base components: all 19 free-tier components fully specced and built — Button, Avatar, Badge, Input, Field, Textarea, Checkbox, Radio Group, Switch, Alert, Spinner, Divider, Skeleton, Progress Bar, Breadcrumbs, Tooltip, Dropdown Menu, Modal, Tabs.
- Code: all 19 components implemented in `packages/registry`, each with a vitest-axe test file and a `registry.json` entry. Tokens live in `packages/registry/styles/`. `pnpm build:registry` emits shadcn-format JSON to `apps/www/public/r/`. CLI (`packages/cli`) has working `init` and `add` that **fetch** from the registry URL (default `https://paubha.com/r`; override with `PAUBHA_REGISTRY_URL` or `components.json` `registry`).
- Docs site: Introduction/Installation/Theming/CLI pages exist; component-doc-page template proven on Avatar. Not yet wired to the real components built above — `apps/www/content/docs/components/*.mdx` still predates them and needs a pass to hook up live previews/prop tables (tracked as the next phase).

## Working style

Direct and practical, build-as-we-go. Don't over-explain settled decisions above — they're settled. If something in this file conflicts with a new instruction, flag the conflict and ask rather than silently picking one.

