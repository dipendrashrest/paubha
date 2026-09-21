export function ComingSoon({ name }: { name: string }) {
  return (
    <div className="not-prose my-6 rounded-lg border border-border-default bg-bg-secondary p-5">
      <p className="text-ui-sm font-medium text-fg-brand">Coming soon</p>
      <p className="mt-1 text-ui-md font-semibold text-fg-primary">
        {name} is not live yet
      </p>
      <p className="mt-2 text-ui-sm text-fg-secondary">
        New updates are coming soon. This page is a placeholder so you can see
        what&apos;s next — real docs land as each piece ships.
      </p>
    </div>
  );
}
