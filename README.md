# Paubha

Open-source components for React & Tailwind.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/dipendrashrest/paubha)](https://github.com/dipendrashrest/paubha/issues)

Copy-paste UI, shadcn-style: you own the source. Docs and the component
registry live at **[paubha.tech](https://paubha.tech)**.

## Quickstart

```bash
npx paubha@latest init
npx paubha@latest add button
```

`init` writes tokens, the Tailwind v4 theme map, and `cn()`. `add` copies
component source from `https://paubha.tech/r` into your project.

Point the CLI at a local docs server while developing:

```bash
PAUBHA_REGISTRY_URL=http://localhost:3000/r npx paubha@latest add button
```

Full docs: [paubha.tech/docs](https://paubha.tech/docs)

### Using an AI coding agent?

Drop **[paubha.tech/skill.md](https://paubha.tech/skill.md)** into your
project (e.g. `.claude/skills/paubha/SKILL.md` for Claude Code, or just paste
it into your agent's context) and it'll know how to install components, use
the design tokens correctly, and follow the real component API conventions —
without you re-explaining any of it per session.

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

MIT © [Dipendra Shrestha](https://github.com/dipendrashrest)

## Contributing

Issues and PRs are welcome. Match existing component conventions in
`CLAUDE.md` (semantic tokens, `shadow-glow-focus`, Lucide-only icons,
colocated vitest-axe tests). Rebuild the registry after UI or token changes:
`pnpm build:registry`.
