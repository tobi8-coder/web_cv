import { Compass, GraduationCap, MapPin, Radar } from "lucide-react";

import { Chip } from "@/components/ui/chip";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { languages, profile, strengths, techMarquee } from "@/lib/data";

const glance = [
  { icon: MapPin, label: "Based in", value: profile.location },
  {
    icon: GraduationCap,
    label: "Studying",
    value: "BSc Computer Science, GCIT (2021 – 2026)",
  },
  { icon: Compass, label: "Focus", value: "Blockchain, dApps, full-stack web" },
  // No "languages" row here — the chip group at the bottom of the card covers it.
  { icon: Radar, label: "Status", value: profile.availability },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* ------------------------------------------------------- story -- */}
        <div className="lg:col-span-7">
          <SectionHeading
            id="about-title"
            eyebrow="01 — About"
            title="Turning contracts into products"
            accent="people can use"
            className="max-w-none"
          />

          <div className="mt-8 space-y-5">
            {profile.about.map((paragraph, index) => (
              <Reveal key={index} delay={0.05 * index}>
                <p className="text-[1.0625rem] leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-9">
            <h3 className="font-mono text-[0.6875rem] tracking-[0.2em] text-subtle uppercase">
              What I bring
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {strengths.map((strength) => (
                <li key={strength}>
                  <Chip>{strength}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* --------------------------------------------------- at a glance -- */}
        <div className="lg:col-span-5">
          <Reveal delay={0.12}>
            <SpotlightCard className="p-6 sm:p-7">
              <h3 className="font-display text-lg font-semibold">At a glance</h3>
              <p className="mt-1.5 text-sm text-muted">
                The short version, for anyone skimming.
              </p>

              <Stagger className="mt-7 space-y-5" stagger={0.06}>
                {glance.map(({ icon: Icon, label, value }) => (
                  <StaggerItem key={label}>
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-card-soft text-accent">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[0.625rem] tracking-[0.16em] text-subtle uppercase">
                          {label}
                        </p>
                        <p className="mt-1 text-sm leading-snug text-foreground">{value}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="mt-7 border-t border-line pt-5">
                <h4 className="font-mono text-[0.625rem] tracking-[0.16em] text-subtle uppercase">
                  Languages
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <li key={language.name}>
                      <Chip tone="accent">
                        {language.name}
                        <span className="ml-1.5 opacity-60">{language.level}</span>
                      </Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>

      {/* ---------------------------------------------------------- stack -- */}
      <Reveal delay={0.1} className="mt-16">
        <p className="text-center font-mono text-[0.6875rem] tracking-[0.22em] text-subtle uppercase">
          Technologies I work with
        </p>
        <div className="mt-6 space-y-3">
          <Marquee items={techMarquee.slice(0, 12)} />
          <Marquee items={techMarquee.slice(12)} reverse />
        </div>
      </Reveal>
    </Section>
  );
}
