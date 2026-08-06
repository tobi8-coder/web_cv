/**
 * Fixed decorative backdrop: theme-aware grid, three slow aurora blooms and a
 * whisper of grain. Entirely CSS — it costs zero client JavaScript, and only
 * `transform` animates so the compositor handles the whole thing.
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Grid, faded out toward the bottom so it reads as depth, not wallpaper. */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(88%_58%_at_50%_0%,black,transparent)]" />

      <div
        className="animate-drift absolute -top-48 -left-40 size-[34rem] rounded-full blur-[110px] will-change-transform sm:size-[42rem]"
        style={{ background: "var(--glow-1)" }}
      />
      <div
        className="animate-float absolute top-[18%] -right-40 size-[28rem] rounded-full blur-[110px] will-change-transform sm:size-[36rem]"
        style={{ background: "var(--glow-2)", animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-12%] left-[35%] size-[26rem] rounded-full blur-[120px] sm:size-[34rem]"
        style={{ background: "var(--glow-3)" }}
      />

      <div className="grain absolute inset-0" />
    </div>
  );
}
