import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Shared section header: numbered eyebrow, headline with an optional gradient
 * tail word, and a supporting line of copy.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: {
  /** Must match the owning section's `aria-labelledby`. */
  id: string;
  eyebrow: string;
  title: string;
  /** Rendered after the title in the brand gradient. */
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full border border-line bg-card-soft px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.18em] text-muted uppercase",
          )}
        >
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          id={id}
          className="mt-5 text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] leading-[1.12] font-semibold"
        >
          {title}
          {accent ? (
            <>
              {" "}
              <span className="text-gradient">{accent}</span>
            </>
          ) : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.14}>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-muted sm:text-[1.0625rem]",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
