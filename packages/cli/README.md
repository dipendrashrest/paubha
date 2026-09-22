# paubha

[![npm version](https://img.shields.io/npm/v/paubha.svg)](https://www.npmjs.com/package/paubha)

CLI for [Paubha](https://paubha.tech), a shadcn-style, copy-paste registry
of React + Tailwind components. Running `add` copies component source straight
into your project; there's no runtime package to depend on.

## Usage

```bash
npx paubha@latest init
npx paubha@latest add button
npx paubha@latest add button avatar tabs
```

### `init`

Writes `components.json`, design tokens, the Tailwind v4 theme map, and
`cn()`, then installs shared dependencies and adds the token `@import`s to your
global stylesheet — right after `@import "tailwindcss";`, at the correct
relative depth. Re-running it won't duplicate those imports.

It looks for the stylesheet in the usual places (`app/globals.css`,
`src/app/globals.css`, `src/index.css`, …), preferring one that already imports
Tailwind. If yours lives somewhere else, set `tailwind.css` in
`components.json` and re-run.

```bash
npx paubha@latest init
npx paubha@latest init --force
```

| Option | Description |
| --- | --- |
| `--cwd <path>` | Target directory (default: current) |
| `--force` | Overwrite existing files |

### `add`

Fetches `{registry}/<name>.json` and copies the component (plus
`registryDependencies`) into your project.

```bash
npx paubha@latest add button
npx paubha@latest add field          # also pulls in input
npx paubha@latest add button --force
```

| Option | Description |
| --- | --- |
| `--cwd <path>` | Target directory (default: current) |
| `--force` | Overwrite existing files |

## Configuration

`init` writes `components.json`:

```json
{
  "$schema": "https://paubha.tech/schema.json",
  "registry": "https://paubha.tech/r",
  "aliases": {
    "components": "components/ui",
    "lib": "lib"
  },
  "tailwind": {
    "tokens": "styles/tokens.css",
    "theme": "styles/theme.css",
    "css": "app/globals.css"
  }
}
```

Override the registry per-command:

```bash
PAUBHA_REGISTRY_URL=http://localhost:3000/r npx paubha@latest add button
```

## Links

- Docs: https://paubha.tech/docs/cli
- Repo: https://github.com/dipendrashrest/paubha
- Issues: https://github.com/dipendrashrest/paubha/issues

## License

MIT
