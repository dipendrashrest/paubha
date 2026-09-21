# Paubha

Open-source components for React & Tailwind.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/dipendra0514/paubha)](https://github.com/dipendra0514/paubha/issues)

Copy-paste UI, shadcn-style: you own the source. Docs and the component registry live at **[paubha.vercel.app](https://paubha.vercel.app)**.

## Quickstart

```bash
npx paubha init
npx paubha add button
```

`init` writes tokens, the Tailwind v4 theme map, and `cn()`. `add` copies component source from `https://paubha.vercel.app/r` into your project.

Point the CLI at a local docs server while developing:

```bash
PAUBHA_REGISTRY_URL=http://localhost:3000/r npx paubha add button
```

Full docs: [paubha.vercel.app/docs](https://paubha.vercel.app/docs)

## Local development

```bash
pnpm install
pnpm build:registry   # emits apps/www/public/r/*.json
pnpm dev
```

- `apps/www` — docs site + landing (Next.js + Fumadocs). Serves `/r/*.json`.
- `packages/registry` — component source (`ui/{name}/`), tokens, `registry.json`.
- `packages/cli` — `npx paubha init|add`.

## License

MIT © [Dipendra Shrestha](https://github.com/dipendra0514)

## Contributing

Issues and PRs are welcome. Match existing component conventions in `CLAUDE.md` (semantic tokens, `shadow-glow-focus`, Lucide-only icons, colocated vitest-axe tests). Rebuild the registry after UI or token changes: `pnpm build:registry`.
