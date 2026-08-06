"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Note on `left`/`right`: these offset the element horizontally before it
 * animates in, which parks it outside the page container until it enters the
 * viewport. The root sets `overflow-x: clip` so that can never produce a
 * horizontal scrollbar, but prefer the vertical directions for full-width
 * blocks on narrow screens.
 */
type Direction = "up" | "down" | "left" | "right" | "none";

function offsetFor(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance, x: 0 };
    case "down":
      return { y: -distance, x: 0 };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  /** Start slightly scaled down — good for cards and media. */
  scale?: number;
  /** Adds a blur-in. Costly to composite, so reserve it for a few hero elements. */
  blur?: boolean;
  once?: boolean;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
};

/**
 * Scroll-triggered entrance. The element type never changes between reduced and
 * full motion — only the keyframes do — which keeps hydration stable for users
 * who have "reduce motion" enabled at the OS level.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 26,
  scale,
  blur = false,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = offsetFor(direction, distance);

  const hidden = reduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        ...offset,
        ...(scale !== undefined ? { scale } : null),
        ...(blur ? { filter: "blur(10px)" } : null),
      };

  const visible = reduced
    ? { opacity: 1 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        ...(scale !== undefined ? { scale: 1 } : null),
        ...(blur ? { filter: "blur(0px)" } : null),
      };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0.25 : duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
};

/** Parent orchestrator — cascades its `<StaggerItem>` children into view. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.15,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 22,
  duration = 0.55,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const offset = offsetFor(direction, distance);

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, ...offset },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: reduced ? 0.25 : duration, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
