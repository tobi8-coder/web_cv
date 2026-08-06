"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Gradient reading-progress hairline pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-90 h-[3px] origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-3),var(--accent-2))]"
    />
  );
}
