import { Trophy } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { achievements, certifications } from "@/lib/data";

export function Certifications() {
  return (
    <Section id="credentials">
      <SectionHeading
        id="credentials-title"
        eyebrow="06 — Credentials"
        title="Certifications, awards"
        accent="& leadership"
        description="Formal certifications alongside the competitions and leadership roles that shaped how I work with a team."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {/* ----------------------------------------------- certifications -- */}
        <div className="space-y-5">
          {certifications.map((certification, index) => (
            <Reveal key={certification.name} delay={0.06 * index}>
              <SpotlightCard className="flex items-center gap-4 p-5 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--accent),var(--accent-3))] text-white shadow-[0_8px_22px_-10px_var(--accent)]">
                  <Icon name={certification.icon} size={20} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[0.9375rem] leading-snug font-semibold sm:text-base">
                    {certification.name}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] text-muted">{certification.issuer}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <div className="rounded-2xl border border-dashed border-line px-5 py-4">
              <p className="text-[0.8125rem] leading-relaxed text-subtle">
                Actively working through further blockchain and cloud certifications
                alongside my final year project.
              </p>
            </div>
          </Reveal>
        </div>

        {/* -------------------------------------------------- achievements -- */}
        <Reveal delay={0.1}>
          <SpotlightCard className="h-full p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-line bg-card-soft text-accent">
                <Trophy size={17} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold">
                Achievements &amp; leadership
              </h3>
            </div>

            <Stagger className="mt-6 space-y-4" stagger={0.06}>
              {achievements.map((achievement) => (
                <StaggerItem key={achievement.title}>
                  <div className="flex items-start gap-3.5 border-b border-line pb-4 last:border-b-0 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9375rem] leading-snug font-medium">
                        {achievement.title}
                      </p>
                      <p className="mt-1 text-[0.8125rem] text-muted">{achievement.detail}</p>
                    </div>
                    {achievement.year ? (
                      <span className="shrink-0 font-mono text-[0.6875rem] text-subtle tabular-nums">
                        {achievement.year}
                      </span>
                    ) : null}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
