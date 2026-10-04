"use client";

import { cn } from "@paubha/registry/lib/cn";
import * as React from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
};

function readBrand(el: HTMLElement) {
  const styles = getComputedStyle(el);
  return {
    mid: styles.getPropertyValue("--brand-500").trim() || "#3B63F5",
    deep: styles.getPropertyValue("--brand-600").trim() || "#2450EA",
    ink: styles.getPropertyValue("--brand-900").trim() || "#1E3485",
  };
}

/**
 * Brand-tinted particle field. Canvas 2D with a fake Z axis, no Three.js.
 * Mouse offset lives on refs. Reduced motion draws one still frame.
 */
export function BrandField({ className }: { className?: string }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouse = React.useRef({ x: 0, y: 0 });
  const raf = React.useRef(0);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = readBrand(wrap);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let visible = true;

    const spawn = () => {
      const count = reduce
        ? 28
        : window.innerWidth < 768
          ? 42
          : 86;
      particles = Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 2.2,
        y: (Math.random() - 0.5) * 1.6,
        z: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.0007,
        vy: (Math.random() - 0.5) * 0.0007,
      }));
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (p: Particle) => {
      const depth = 1.15 / p.z;
      return {
        sx: width / 2 + (p.x + mouse.current.x * 0.08) * width * 0.38 * depth,
        sy: height / 2 + (p.y - mouse.current.y * 0.05) * height * 0.42 * depth,
        r: Math.max(0.6, 2.4 * depth),
        a: Math.min(0.55, 0.12 + 0.28 * depth),
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const { sx, sy, r, a } = project(p);
        ctx.beginPath();
        ctx.fillStyle = p.z < 1 ? colors.mid : colors.deep;
        ctx.globalAlpha = a;
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = colors.ink;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 7) {
        const a = project(particles[i]!);
        const b = project(particles[(i + 11) % particles.length]!);
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!visible) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > 1.2 || p.x < -1.2) p.vx *= -1;
        if (p.y > 1 || p.y < -1) p.vy *= -1;
      }
      draw();
      raf.current = requestAnimationFrame(tick);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.current.x = (event.clientX - rect.left) / rect.width - 0.5;
      mouse.current.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    io.observe(wrap);

    resize();
    spawn();
    draw();
    if (!reduce) raf.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf.current);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}

/** CSS 3D brand object. Orbit is CSS animation, not a JS render loop. */
export function BrandOrbit({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[420px]",
        className,
      )}
      style={{ perspective: "920px" }}
    >
      <div
        className="pb-orbit absolute inset-[12%] rounded-lg border border-border-brand/40 bg-bg-brand-subtle/70 shadow-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-4 rounded-md border border-border-brand/30 bg-bg-brand-solid/10" />
        <div
          className="absolute inset-x-10 top-1/2 h-px bg-border-brand/50"
          style={{ transform: "rotateX(70deg)" }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-display-xs font-semibold tracking-[-0.04em] text-fg-brand">
            glow
          </span>
        </div>
      </div>
      <div className="pb-float absolute top-[8%] right-[6%] size-16 rounded-md border border-border-default bg-bg-elevated shadow-md" />
      <div className="pb-float absolute bottom-[10%] left-[4%] size-12 rounded-full border border-border-brand bg-bg-brand-solid/20" />
    </div>
  );
}
