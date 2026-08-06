"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { EASE } from "@/lib/motion";

const INTERVAL_MS = 2800;

/**
 * Cycles through the roles from the CV.
 *
 * The longest role is rendered invisibly in normal flow to reserve width, so
 * the trailing caret stays put instead of jittering on every swap. The full
 * list is exposed once as screen-reader text — assistive tech gets a stable
 * sentence rather than a value that mutates every few seconds.
 */
export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || roles.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % roles.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduced, roles.length]);

  const current = roles[index] ?? roles[0] ?? "";
  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), roles[0] ?? "");

  return (
    <span className="flex max-w-full items-center gap-1.5">
      <span className="sr-only">{roles.join(", ")}</span>

      <span aria-hidden="true" className="relative block overflow-hidden">
        <span className="invisible block whitespace-nowrap">{longest}</span>

        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={current}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: "0.8em" }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: "-0.8em" }}
            transition={{ duration: reduced ? 0.2 : 0.42, ease: EASE }}
            className="absolute inset-0 block whitespace-nowrap"
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>

      <span
        aria-hidden="true"
        className="animate-blink inline-block h-[1.05em] w-[2px] shrink-0 rounded-full bg-accent"
      />
    </span>
  );
}
