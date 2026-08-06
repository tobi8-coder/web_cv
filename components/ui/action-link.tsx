import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-out motion-safe:active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-[0_10px_30px_-10px_var(--accent)] hover:shadow-[0_16px_40px_-12px_var(--accent)] bg-[linear-gradient(100deg,var(--accent)_0%,var(--accent-3)_55%,var(--accent-2)_120%)]",
  secondary:
    "surface text-foreground hover:border-line-strong hover:bg-card-soft hover:text-accent",
  ghost: "text-muted hover:bg-accent-soft hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem] sm:h-13 sm:px-7",
};

export type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  /** Triggers a file download instead of navigation. */
  download?: string | boolean;
  "aria-label"?: string;
};

/**
 * The single link/button primitive used site-wide. Stays a server component —
 * all of its interactivity is CSS — so it adds nothing to the JS bundle.
 */
export function ActionLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  download,
  ...rest
}: ActionLinkProps) {
  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {/* Light sweep across the primary button on hover. */}
      {variant === "primary" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.32),transparent)] transition-transform duration-700 ease-out motion-safe:group-hover/btn:translate-x-full"
        />
      ) : null}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
}
