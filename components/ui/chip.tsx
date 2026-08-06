import { cn } from "@/lib/utils";

/** Small tag pill used for tech stacks, languages and strengths. */
export function Chip({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-300",
        tone === "accent"
          ? "border-accent/25 bg-accent-soft text-accent"
          : "border-line bg-card-soft text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
