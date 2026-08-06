import { GraduationCap, School } from "lucide-react";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";
import { TimelineItem } from "@/components/ui/timeline-item";
import { education } from "@/lib/data";

const icons = [GraduationCap, School];

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        id="education-title"
        eyebrow="04 — Education"
        title="Academic"
        accent="foundation"
        description="Coursework in distributed systems, databases and software engineering — with every elective and project pushed toward blockchain."
      />

      <Timeline className="mt-14">
        {education.map((item, index) => (
          <TimelineItem
            key={item.degree}
            icon={icons[index] ?? GraduationCap}
            delay={0.05 * index}
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <div>
                <h3 className="font-display text-lg font-semibold sm:text-xl">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-accent">{item.institution}</p>
              </div>
              <span className="font-mono text-xs whitespace-nowrap text-muted">
                {item.period}
              </span>
            </div>

            {item.meta ? (
              <dl className="mt-5 space-y-4">
                {item.meta.map((entry) => (
                  <div key={entry.label}>
                    <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-subtle uppercase">
                      {entry.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                      {entry.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {item.detail ? (
              <p className="mt-5 border-t border-line pt-4 text-[0.9375rem] leading-relaxed text-muted">
                {item.detail}
              </p>
            ) : null}
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
