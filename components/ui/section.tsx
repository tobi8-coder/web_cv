import { cn } from "@/lib/utils";

/**
 * Standard section shell: consistent vertical rhythm, page container and the
 * scroll offset that keeps anchor targets clear of the fixed header.
 */
export function Section({
  id,
  children,
  className,
  containerClassName,
  labelledBy,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? `${id}-title`}
      className={cn("relative scroll-mt-24 py-20 sm:py-24 lg:py-28", className)}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
