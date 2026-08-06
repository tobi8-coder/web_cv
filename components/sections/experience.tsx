import { Briefcase, Palette } from "lucide-react";

import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";
import { TimelineItem } from "@/components/ui/timeline-item";
import { experiences } from "@/lib/data";

/** Per-role marker icons, matched by index to `experiences`. */
const icons = [Briefcase, Palette];

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience-title"
        eyebrow="03 — Experience"
        title="Where I have"
        accent="worked so far"
        description="A blockchain ambassadorship that put me in front of a room, and a design internship that taught me to care about how things look."
      />

      <Timeline className="mt-14">
        {experiences.map((item, index) => (
          <TimelineItem
            key={`${item.company}-${item.role}`}
            icon={icons[index] ?? Briefcase}
            delay={0.05 * index}
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <div>
                <h3 className="font-display text-lg font-semibold sm:text-xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-accent">{item.company}</p>
              </div>

              <div className="flex flex-col items-start gap-1.5 sm:items-end">
                <span className="font-mono text-xs text-muted">{item.period}</span>
                <Chip>{item.type}</Chip>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.55rem] left-0 size-1.5 rounded-full bg-accent/60"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
              {item.stack.map((tag) => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </ul>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
