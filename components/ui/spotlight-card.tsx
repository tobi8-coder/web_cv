"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Card surface with a cursor-following glow and a gradient hairline on hover.
 *
 * The pointer handler writes CSS custom properties directly, so tracking the
 * cursor never triggers a React render. The bounding box is measured once on
 * enter instead of on every move.
 *
 * Note: no `overflow-hidden` here on purpose — the `.gradient-ring` border sits
 * one pixel outside the box and would be clipped away. Inner media should clip
 * itself.
 */
export function SpotlightCard({
  children,
  className,
  animatedRing = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Keep the conic gradient border on permanently and rotate it. */
  animatedRing?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);

  return (
    <div
      ref={ref}
      data-always={animatedRing ? "true" : undefined}
      onPointerEnter={() => {
        rect.current = ref.current?.getBoundingClientRect() ?? null;
      }}
      onPointerMove={(event) => {
        const node = ref.current;
        const box = rect.current;
        if (!node || !box) return;
        node.style.setProperty("--x", `${event.clientX - box.left}px`);
        node.style.setProperty("--y", `${event.clientY - box.top}px`);
      }}
      className={cn(
        "spotlight gradient-ring surface group relative rounded-2xl transition-[transform,box-shadow,border-color] duration-500 ease-out",
        "hover:border-line-strong hover:shadow-lift motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
