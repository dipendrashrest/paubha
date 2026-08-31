# asteria-ui

CLI for [Asteria UI](https://asteria-ui.vercel.app) — a shadcn-style, copy-paste
registry of React + Tailwind components. Running `add` copies component source
straight into your project; there's no runtime package to depend on.

## Usage

```bash
npx asteria-ui init
npx asteria-ui add button
```

`init` writes a `components.json` config; `add <name>` fetches
`{registry}/<name>.json` and copies the component (plus its dependencies)
into your project.

## Configuration

Set the registry URL in `components.json`:

```json
{
  "registry": "https://asteria-ui.vercel.app/r"
}
```

or override it per-command with an environment variable:

```bash
ASTERIA_REGISTRY_URL=http://localhost:3000/r npx asteria-ui add button
```

## Links

- Repo: https://github.com/dipendra0514/asteria-ui
- Issues: https://github.com/dipendra0514/asteria-ui/issues
- Docs & component registry: https://asteria-ui.vercel.app

## License

MIT
