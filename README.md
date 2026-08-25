# Asteria UI

Open-source components for React & Tailwind.

## Structure

- `apps/www` — docs site + landing (Next.js + Fumadocs). Serves the public registry at `/r/*.json`.
- `packages/registry` — component source of truth (`ui/{name}/{name}.tsx`, `lib/`, `styles/`), `registry.json`, and the `build` script that emits `apps/www/public/r/*.json`.
- `packages/cli` — `npx asteria-ui init|add`. Fetches components from the registry URL (default `https://asteria-ui.com/r`).

## Getting started

```bash
pnpm install
pnpm build:registry   # emits apps/www/public/r/*.json
pnpm dev
```

Docs at http://localhost:3000/docs (or the next free port).

## CLI

```bash
npx asteria-ui init
npx asteria-ui add button

# Point at a local docs server during development:
ASTERIA_REGISTRY_URL=http://localhost:3000/r npx asteria-ui add button
```

`components.json` includes a `registry` field (default `https://asteria-ui.com/r`).

## Notes

- Design tokens in `packages/registry/styles/tokens.css` mirror the Figma variable
  system 1:1 (primitives → semantic, light + dark).
- Rebuild the hosted registry JSON after changing components or tokens:
  `pnpm build:registry`.
- Fumadocs iterates quickly. If an API here has drifted, cross-check against
  https://fumadocs.dev — the structure (source.config.ts, lib/source.ts, DocsLayout)
  stays the same.
