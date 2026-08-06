"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Vertical timeline rail that fills as the section scrolls past.
 *
 * The gradient line is a single `scaleY` transform driven by scroll progress —
 * no height animation, so it composites without touching layout. Children are
 * server-rendered and pass straight through.
 */
export function Timeline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-3 w-px bg-line sm:left-5"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-3 w-px origin-top bg-[linear-gradient(180deg,var(--accent),var(--accent-3)_55%,var(--accent-2))] sm:left-5"
      />
      <div className="space-y-6">{children}</div>
    </div>
  );
}
