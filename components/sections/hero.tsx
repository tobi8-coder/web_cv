import { ArrowDown, Download, Mail, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

import { RoleRotator } from "@/components/sections/hero-role";
import { ActionLink } from "@/components/ui/action-link";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { profile, stats } from "@/lib/data";
import portrait from "@/public/profile.jpg";

/** Chips that float around the portrait. */
const floatingChips = [
  { label: "Solidity", className: "-top-3 -left-4 sm:-left-8", delay: "0s" },
  { label: "React", className: "top-1/3 -right-4 sm:-right-10", delay: "-2.5s" },
  { label: "Node.js", className: "-bottom-3 left-4 sm:left-0", delay: "-5s" },
];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative flex min-h-[100svh] scroll-mt-24 items-center pt-28 pb-24 sm:pt-32"
    >
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* --------------------------------------------------- copy -- */}
          <div className="order-2 lg:order-1">
            <Reveal duration={0.7}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent-soft px-3.5 py-1.5 text-xs font-medium text-accent">
                <span className="relative flex size-2">
                  <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-accent" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {profile.availability}
              </span>
            </Reveal>

            <Reveal delay={0.08} duration={0.8} blur>
              <h1
                id="home-title"
                className="mt-6 text-[clamp(2.4rem,1.3rem+4.6vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.03em]"
              >
                Pema Yeshi
                <br />
                <span className="text-gradient">Tshering</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-[clamp(1.05rem,0.9rem+0.7vw,1.5rem)] font-medium text-muted">
                <span className="text-subtle">I build as a</span>
                <span className="text-foreground">
                  <RoleRotator roles={profile.roleRotation} />
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <ActionLink href="#projects" size="lg">
                    <Sparkles size={16} aria-hidden="true" />
                    View my work
                  </ActionLink>
                </Magnetic>

                <Magnetic strength={0.18}>
                  <ActionLink
                    href={profile.cv}
                    download
                    variant="secondary"
                    size="lg"
                    aria-label="Download CV as PDF"
                  >
                    <Download size={16} aria-hidden="true" />
                    Download CV
                  </ActionLink>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent"
                  >
                    <Mail size={15} aria-hidden="true" className="shrink-0" />
                    <span className="break-all">{profile.email}</span>
                  </a>
                </li>
                <li className="inline-flex items-center gap-2">
                  <MapPin size={15} aria-hidden="true" className="shrink-0" />
                  {profile.location}
                </li>
              </ul>
            </Reveal>
          </div>

          {/* ------------------------------------------------ portrait -- */}
          <div className="order-1 lg:order-2">
            <Reveal
              direction="none"
              scale={0.9}
              duration={0.9}
              delay={0.1}
              className="relative mx-auto w-[min(20rem,78vw)] sm:w-[22rem] lg:w-full lg:max-w-[24rem]"
            >
              {/* Soft bloom behind the portrait. */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-full opacity-80 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, var(--glow-1), transparent 68%)",
                }}
              />

              {/*
                Static dashed offset ring. It is deliberately not rotating: a
                spinning rounded square sweeps a bounding box up to 1.41x its
                width, which pushed the page into horizontal scroll on narrow
                screens. The conic gradient ring below supplies the motion.
              */}
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-[2.75rem] border border-dashed border-line-strong/60"
              />

              <div
                data-always="true"
                className="gradient-ring relative aspect-square rounded-[2rem] p-[3px]"
              >
                <div className="relative size-full overflow-hidden rounded-[1.85rem] bg-card-soft">
                  <Image
                    src={portrait}
                    alt={`Portrait of ${profile.name}, ${profile.role}`}
                    placeholder="blur"
                    priority
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 22rem, 24rem"
                    className="size-full object-cover"
                  />
                  {/* Faint bottom vignette for depth. Kept light so it does not
                      read as a grey smudge over the photo in light mode. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgb(5_7_15/0.18))]"
                  />
                </div>
              </div>

              {floatingChips.map((chip) => (
                <span
                  key={chip.label}
                  aria-hidden="true"
                  style={{ animationDelay: chip.delay }}
                  className={`animate-float absolute ${chip.className} rounded-full border border-line bg-background/85 px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-muted shadow-card backdrop-blur-md`}
                >
                  {chip.label}
                </span>
              ))}
            </Reveal>
          </div>
        </div>

        {/* ----------------------------------------------------- stats -- */}
        <Reveal delay={0.15} className="mt-16 lg:mt-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background/60 px-5 py-6 backdrop-blur-sm">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-[clamp(1.6rem,1.3rem+1vw,2.25rem)] font-semibold tabular-nums">
                    {stat.prefix}
                    <Counter value={stat.value} />
                    {stat.suffix}
                  </span>
                  <span className="mt-1.5 block text-xs leading-snug text-subtle">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Scroll cue — decorative, hidden on short viewports. */}
      <a
        href="#about"
        aria-hidden="true"
        tabIndex={-1}
        className="animate-float absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors duration-300 hover:text-accent lg:flex"
      >
        <span className="font-mono text-[0.625rem] tracking-[0.24em] uppercase">Scroll</span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}
