# paubha

CLI for [Paubha](https://paubha.vercel.app) — a shadcn-style, copy-paste
registry of React + Tailwind components. Running `add` copies component source
straight into your project; there's no runtime package to depend on.

## Usage

```bash
npx paubha init
npx paubha add button
```

`init` writes a `components.json` config; `add <name>` fetches
`{registry}/<name>.json` and copies the component (plus its dependencies)
into your project.

## Configuration

Set the registry URL in `components.json`:

```json
{
  "registry": "https://paubha.vercel.app/r"
}
```

or override it per-command with an environment variable:

```bash
PAUBHA_REGISTRY_URL=http://localhost:3000/r npx paubha add button
```

## Links

- Repo: https://github.com/dipendra0514/paubha
- Issues: https://github.com/dipendra0514/paubha/issues
- Docs & component registry: https://paubha.vercel.app

## License

MIT
