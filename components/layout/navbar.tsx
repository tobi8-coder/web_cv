"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ActionLink } from "@/components/ui/action-link";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { githubUrl, navItems, profile } from "@/lib/data";
import { useActiveSection, useLockBodyScroll, useScrolled } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.id);
const linkedIn = "https://linkedin.com/in/pema-yeshi-tshering";

export function Navbar() {
  const scrolled = useScrolled(24);
  const active = useActiveSection(sectionIds, "home");
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /**
   * Closing the sheet unlocks body scroll, so the anchor's default jump has to
   * wait for that to land — otherwise the browser tries to scroll a frozen
   * document and nothing moves.
   */
  const goToSection = useCallback(
    (id: string) => {
      setOpen(false);
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", `#${id}`);
      }, 240);
    },
    [reduced],
  );

  return (
    <header className="no-print fixed inset-x-0 top-0 z-80">
      <div className="container-page">
        <div
          className={cn(
            "mt-3 flex h-16 items-center justify-between gap-3 rounded-2xl border px-3 transition-all duration-500 ease-out sm:px-4",
            scrolled || open
              ? "border-line bg-background/72 shadow-card backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          {/* ------------------------------------------------------- brand -- */}
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2.5 rounded-xl py-1.5 pr-2"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,var(--accent),var(--accent-3)_55%,var(--accent-2))] font-display text-[0.8125rem] font-bold text-white shadow-[0_6px_18px_-6px_var(--accent)]">
              PT
            </span>
            {/* Visible on tablet (where the row is otherwise sparse), hidden at
                `lg` when the eight section links need the room, back at `xl`. */}
            <span className="hidden min-w-0 flex-col leading-tight md:flex lg:hidden xl:flex">
              <span className="truncate font-display text-sm font-semibold">
                {profile.name}
              </span>
              <span className="truncate font-mono text-[0.6875rem] tracking-[0.14em] text-subtle uppercase">
                {profile.role}
              </span>
            </span>
          </a>

          {/* ------------------------------------------------- desktop nav -- */}
          <nav aria-label="Section navigation" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                        isActive ? "text-accent" : "text-muted hover:text-foreground",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-pill"
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 380, damping: 32 }
                          }
                        />
                      ) : null}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ----------------------------------------------------- actions -- */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            <ActionLink
              href={profile.cv}
              download
              size="sm"
              className="hidden sm:inline-flex"
              aria-label="Download CV as PDF"
            >
              <Download size={15} aria-hidden="true" />
              <span className="xl:hidden">CV</span>
              <span className="hidden xl:inline">Download CV</span>
            </ActionLink>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="surface grid size-10 place-items-center rounded-full text-muted transition-colors duration-300 hover:border-line-strong hover:text-accent lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ mobile sheet -- */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-0 top-0 -z-10 bg-background/94 backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
              }}
              className="container-page flex h-full flex-col justify-center gap-1 pt-20 pb-10"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: reduced ? 0.2 : 0.45, ease: EASE },
                    },
                  }}
                >
                  <button
                    type="button"
                    onClick={() => goToSection(item.id)}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-xl px-2 py-3 text-left transition-colors duration-300",
                      active === item.id ? "text-accent" : "text-foreground",
                    )}
                  >
                    <span className="font-mono text-xs text-subtle tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto h-px flex-1 origin-right scale-x-0 bg-line-strong transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </button>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
                }}
                className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6"
              >
                <ActionLink href={profile.cv} download size="sm">
                  <Download size={15} aria-hidden="true" />
                  Download CV
                </ActionLink>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="surface grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-accent"
                >
                  <LinkedInIcon size={16} />
                </a>
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="surface grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-accent"
                  >
                    <GitHubIcon size={16} />
                  </a>
                ) : null}
                <span className="ml-auto font-mono text-[0.6875rem] text-subtle">
                  {profile.location}
                </span>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
