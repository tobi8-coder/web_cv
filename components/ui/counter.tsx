"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { EASE } from "@/lib/motion";

/**
 * Counts up to `value` when scrolled into view.
 *
 * Writes to `textContent` from a layout effect rather than through state: no
 * re-render per frame, and no flash of the final number before the run starts.
 * The server-rendered markup already contains the real figure, so the value is
 * correct for crawlers and with JavaScript disabled.
 */
export function Counter({
  value,
  duration = 1.6,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.textContent = value.toLocaleString("en-US");
      return;
    }

    if (!inView) {
      node.textContent = "0";
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString("en-US");
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-US")}
    </span>
  );
}
