"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 *
 * Both icons are always rendered and cross-faded purely with the `dark:`
 * variant, so the correct one is showing the moment next-themes stamps the
 * class on <html> — before first paint. That avoids the usual `mounted` state
 * guard entirely: no hydration mismatch, no icon flash, no extra render.
 *
 * The accessible name is swapped the same way, since an `aria-label` attribute
 * cannot react to the theme class.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    // `resolvedTheme` is populated by the time a click can happen; the DOM class
    // is the fallback for the vanishingly rare pre-resolution click.
    const isDark = resolvedTheme
      ? resolvedTheme === "dark"
      : document.documentElement.classList.contains("dark");

    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title="Switch between light and dark theme"
      className={cn(
        "surface relative grid size-10 shrink-0 place-items-center rounded-full text-muted transition-colors duration-300 hover:border-line-strong hover:text-accent",
        className,
      )}
    >
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:block">Switch to light theme</span>

      <Sun
        size={17}
        aria-hidden="true"
        className="col-start-1 row-start-1 rotate-0 scale-100 opacity-100 transition-all duration-300 ease-out dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
      <Moon
        size={17}
        aria-hidden="true"
        className="col-start-1 row-start-1 rotate-90 scale-0 opacity-0 transition-all duration-300 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
