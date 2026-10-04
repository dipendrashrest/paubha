import type { ReactNode } from "react";

export default function MarketingExamplesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary text-fg-primary antialiased">
      {children}
    </div>
  );
}
