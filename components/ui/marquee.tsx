import { cn } from "@/lib/utils";

/**
 * Pure-CSS infinite marquee: the track holds two identical copies of the list
 * and translates by exactly -50%, so the seam is invisible. No JS, no
 * measurement, no layout thrash — and it pauses on hover.
 */
export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-3 pr-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover:[animation-play-state:paused]",
        )}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            // The duplicate half is decorative — hide it from assistive tech.
            aria-hidden={index >= items.length ? "true" : undefined}
            className="flex items-center gap-2.5 rounded-full border border-line bg-card-soft px-4 py-2 text-sm text-muted"
          >
            <span
              className="size-1.5 rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))]"
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
