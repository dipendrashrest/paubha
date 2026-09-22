# @paubha/registry

Source of truth for Paubha UI: one folder per component under `ui/`, shared `lib/` helpers, and `styles/` tokens.

This package is **not** installed from npm by apps. Consumers copy files via [`npx paubha add`](https://paubha.tech/docs/cli) from the hosted registry JSON.

## Layout

```
ui/{name}/{name}.tsx   # component
ui/{name}/{name}.test.tsx
ui/{name}/index.ts
lib/                   # cn(), hooks
styles/tokens.css      # primitives + semantic tokens (light/dark)
styles/theme.css       # Tailwind v4 @theme
registry.json          # shadcn-format catalog
scripts/build-registry.mjs
```

## Build

From the repo root:

```bash
pnpm build:registry
```

Writes `apps/www/public/r/{name}.json` (gitignored) for the docs site to serve.

Homepage / registry base: `https://paubha.tech`.
