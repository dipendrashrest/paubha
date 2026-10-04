"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as React from "react";

/**
 * Scroll reveal. IntersectionObserver only. No scroll listeners, no React
 * state per frame. Purpose: hierarchy (content arrives as you reach it).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-inview={inView ? "true" : "false"}
      style={{ "--pb-delay": `${delay}ms` } as React.CSSProperties}
      className={cn("pb-reveal", className)}
    >
      {children}
    </div>
  );
}
