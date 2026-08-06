import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

/**
 * One node on a `<Timeline>`: marker on the rail, card to its right.
 * The marker's left offset is tuned to sit centred on the rail at both
 * breakpoints.
 */
export function TimelineItem({
  icon: Icon,
  children,
  delay = 0,
  className,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal direction="up" delay={delay} amount={0.12} className="relative">
      <div className={cn("relative pl-10 sm:pl-16", className)}>
        <span
          aria-hidden="true"
          className="absolute top-1 left-0 grid size-6 place-items-center rounded-full border border-line bg-background text-accent shadow-card sm:size-10"
        >
          <Icon className="size-3 sm:size-[1.0625rem]" />
        </span>

        <SpotlightCard className="p-5 sm:p-6">{children}</SpotlightCard>
      </div>
    </Reveal>
  );
}
