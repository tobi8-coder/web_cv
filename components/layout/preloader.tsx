"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { EASE } from "@/lib/motion";
import { profile } from "@/lib/data";
import { useIsomorphicLayoutEffect, useLockBodyScroll } from "@/lib/hooks";

const SESSION_KEY = "pyt-intro-played";

/**
 * How long the curtain stays up. This is measurable: the curtain occludes the
 * hero, so the portrait only becomes the largest contentful paint once the
 * curtain leaves — every millisecond here lands on LCP. 1100ms is long enough
 * for the name to finish staggering in and short enough to keep LCP near 1.2s.
 */
const HOLD_MS = 1100;

/**
 * Intro curtain.
 *
 * Deliberately absent from the server-rendered HTML: it mounts from a layout
 * effect, before the browser's first paint. That means no flash of content for
 * visitors who see it, but crawlers and JavaScript-disabled browsers get the
 * real page immediately instead of a permanent overlay. It also plays once per
 * session, and never when reduced motion is requested.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "showing" | "gone">("idle");

  useIsomorphicLayoutEffect(() => {
    const alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (alreadyPlayed || reduced) {
      setPhase("gone");
      return;
    }

    setPhase("showing");
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("gone");
    }, HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [reduced]);

  useLockBodyScroll(phase === "showing");

  // Each glyph animates on its own, so spaces need a non-collapsing character.
  const letters = [...profile.name].map((letter) =>
    letter === " " ? "\u00A0" : letter,
  );

  return (
    <AnimatePresence>
      {phase === "showing" ? (
        <motion.div
          key="preloader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-100 grid place-items-center overflow-hidden bg-background"
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 50%, var(--glow-1), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-6 px-6">
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid size-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-3)_55%,var(--accent-2))] font-display text-sm font-bold text-white"
            >
              PT
            </motion.span>

            <p className="flex flex-wrap justify-center font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 + index * 0.022, ease: EASE }}
                >
                  {letter}
                </motion.span>
              ))}
            </p>

            <div className="h-px w-40 overflow-hidden rounded-full bg-line sm:w-56">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: HOLD_MS / 1000, ease: "easeInOut" }}
                className="h-full w-full origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
              />
            </div>

            <span className="font-mono text-[0.6875rem] tracking-[0.24em] text-subtle uppercase">
              {profile.role}
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
