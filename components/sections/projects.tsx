"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Boxes, Landmark, Lock, Store, Vote, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { GitHubIcon } from "@/components/ui/brand-icons";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Abstract cover art per project — no screenshots exist, so we design instead.
 *
 * These gradients are fixed hex values rather than theme tokens on purpose: the
 * covers carry white text and icons, so they need to stay deep and saturated in
 * light *and* dark mode. Theme tokens lighten in dark mode and washed the
 * overlays out.
 */
const covers: Record<string, { icon: LucideIcon; gradient: string }> = {
  "Bond Tokenization Platform": {
    icon: Landmark,
    gradient: "linear-gradient(135deg,#4f46e5,#7c3aed 72%)",
  },
  "NFT Marketplace Prototype": {
    icon: Store,
    gradient: "linear-gradient(135deg,#7c3aed,#0e7490 80%)",
  },
  "Decentralized Voting System": {
    icon: Vote,
    gradient: "linear-gradient(135deg,#0e7490,#4338ca 74%)",
  },
  "Supply Chain Traceability DApp": {
    icon: Boxes,
    gradient: "linear-gradient(135deg,#4338ca,#0891b2 78%)",
  },
  "Secure File Storage System": {
    icon: Lock,
    gradient: "linear-gradient(135deg,#6d28d9,#4f46e5 72%)",
  },
};

const fallbackCover = {
  icon: Boxes,
  gradient: "linear-gradient(135deg,#4f46e5,#7c3aed 72%)",
};

export function Projects() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const reduced = useReducedMotion();

  const visible =
    filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeadingInline />

          {/* ------------------------------------------------------ filters -- */}
          <Reveal delay={0.1}>
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="surface flex flex-wrap gap-1 rounded-full p-1"
            >
              {projectCategories.map((category) => {
                const isActive = filter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(category)}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                      isActive ? "text-white" : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="project-filter"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(100deg,var(--accent),var(--accent-3))]"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                    {category}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <p aria-live="polite" className="sr-only">
          Showing {visible.length} of {projects.length} projects.
        </p>

        {/* -------------------------------------------------------- grid -- */}
        <motion.ul
          layout={!reduced}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="mt-12 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence initial={false} mode={reduced ? "sync" : "popLayout"}>
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} reduced={Boolean(reduced)} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

/* Kept inline so the heading can sit in the same flex row as the filter bar. */
function SectionHeadingInline() {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card-soft px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.18em] text-muted uppercase">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          05 — Projects
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id="projects-title"
          className="mt-5 text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] leading-[1.12] font-semibold"
        >
          Things I have <span className="text-gradient">shipped</span>
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-[1.0625rem]">
          Five builds that took a smart contract from design through deployment and into an
          interface someone could actually use.
        </p>
      </Reveal>
    </div>
  );
}

function ProjectCard({ project, reduced }: { project: Project; reduced: boolean }) {
  const { icon: Icon, gradient } = covers[project.title] ?? fallbackCover;
  const hasLinks = Boolean(project.links?.repo || project.links?.demo);

  return (
    <motion.li
      layout={!reduced}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: reduced ? 0.2 : 0.55, ease: EASE },
        },
      }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -10 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="h-full"
    >
      {/* No `overflow-hidden` on the card: the gradient ring sits a pixel
          outside the box and the cover clips itself. */}
      <SpotlightCard animatedRing={project.featured} className="flex h-full flex-col p-0">
        {/* ------------------------------------------------------- cover -- */}
        <div
          className="relative isolate h-36 overflow-hidden rounded-t-2xl"
          style={{ background: gradient }}
        >
          <div className="bg-dots absolute inset-0 opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_10%_0%,rgb(255_255_255/0.28),transparent_60%)]" />

          <span
            aria-hidden="true"
            className="absolute -right-4 -bottom-6 font-display text-[5.5rem] leading-none font-bold text-white/15 select-none"
          >
            {project.year}
          </span>

          <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
            <Icon size={20} aria-hidden="true" />
          </span>

          <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
            {project.featured ? (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] font-semibold tracking-wide text-slate-900 uppercase">
                Featured
              </span>
            ) : null}
            <span className="rounded-full border border-white/25 bg-black/20 px-2.5 py-1 font-mono text-[0.625rem] tracking-wide text-white/90 backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Badge lives on the cover so every card body starts with its title
              and the headings line up across the row. */}
          {project.badge ? (
            <span className="absolute bottom-3.5 left-4 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
              {project.badge}
            </span>
          ) : null}
        </div>

        {/* -------------------------------------------------------- body -- */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-[1.0625rem] leading-snug font-semibold sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[0.6875rem] tracking-wide text-subtle">
            {project.role}
          </p>

          <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-muted">
            {project.summary}
          </p>

          <ul className="mt-4 space-y-2">
            {project.highlights.slice(0, 2).map((highlight) => (
              <li
                key={highlight}
                className="relative pl-4 text-[0.8125rem] leading-relaxed text-subtle"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[0.5rem] left-0 size-1 rounded-full bg-accent/60"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
            {project.stack.map((tag) => (
              <li key={tag}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>

          {hasLinks ? (
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
              {project.links?.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-accent transition-opacity hover:opacity-75"
                >
                  Live demo
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : null}
              {project.links?.repo ? (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-accent"
                >
                  <GitHubIcon size={14} />
                  Source
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </SpotlightCard>
    </motion.li>
  );
}
