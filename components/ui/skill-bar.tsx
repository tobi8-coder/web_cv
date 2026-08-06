"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { Counter } from "@/components/ui/counter";
import { EASE } from "@/lib/motion";

/**
 * Proficiency meter. The fill is a fixed-width element animated with `scaleX`
 * so the whole run is composited — no per-frame layout like a width animation.
 */
export function SkillBar({
  name,
  level,
  delay = 0,
}: {
  name: string;
  level: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[0.9375rem] font-medium">{name}</span>
        <span className="font-mono text-xs text-subtle tabular-nums">
          <Counter value={level} />%
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line"
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${level}%`,
            transformOrigin: "left center",
            backgroundImage:
              "linear-gradient(90deg, var(--accent) 0%, var(--accent-3) 55%, var(--accent-2) 100%)",
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: reduced ? 0.2 : 1.05, delay: reduced ? 0 : delay, ease: EASE }}
        />
      </div>
    </div>
  );
}
