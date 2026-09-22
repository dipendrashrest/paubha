import cliPackageJson from "../../../packages/cli/package.json";

/**
 * The single source of truth for "Paubha's current version" is the published
 * CLI's own package.json — that's the one thing in this repo that's actually
 * versioned and released. A static import gets inlined into the bundle at
 * build time, so nothing can go stale the way the navbar badge did (it sat
 * at "v0.1.2" through three real releases before anyone noticed) — and
 * unlike a runtime `fs.readFileSync`, it needs no file-tracing at deploy
 * time; the value is already part of the compiled output.
 *
 * Server-only in effect: only ever import this from a Server Component and
 * pass the value down as a prop, matching the app's existing Client/Server
 * split (e.g. SiteNavbar). It would still work from a "use client" file —
 * the string just gets duplicated into that client bundle too — but there's
 * no reason to.
 */
export const CLI_VERSION: string = cliPackageJson.version;
