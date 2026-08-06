"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useScrolled } from "@/lib/hooks";

/** Floating scroll-to-top control wrapped in a live page-progress ring. */
export function BackToTop() {
  const visible = useScrolled(700);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
          }
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          whileHover={reduced ? undefined : { y: -3 }}
          className="no-print surface fixed right-5 bottom-5 z-70 grid size-12 place-items-center rounded-full text-muted shadow-card transition-colors duration-300 hover:text-accent sm:right-8 sm:bottom-8"
        >
          <svg
            viewBox="0 0 44 44"
            aria-hidden="true"
            className="absolute inset-0 size-full -rotate-90"
          >
            <circle
              cx="22"
              cy="22"
              r="20.5"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="22"
              cy="22"
              r="20.5"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
          <ArrowUp size={17} className="relative" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
