import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillBar } from "@/components/ui/skill-bar";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <Section id="skills" className="relative">
      <SectionHeading
        id="skills-title"
        eyebrow="02 — Skills"
        title="The toolkit behind"
        accent="the builds"
        description="Grouped by where they sit in the stack. Levels reflect how confidently I reach for each one without documentation open."
        align="center"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, groupIndex) => (
          <Reveal
            key={group.title}
            delay={0.05 * (groupIndex % 3)}
            scale={0.98}
            amount={0.1}
          >
            <SpotlightCard className="h-full p-6">
              <div className="flex items-start gap-3.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-card-soft text-accent transition-transform duration-500 group-hover:scale-105">
                  <Icon name={group.icon} size={19} />
                </span>
                <div>
                  <h3 className="font-display text-[1.0625rem] font-semibold">
                    {group.title}
                  </h3>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-subtle">
                    {group.blurb}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {group.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.07 * skillIndex}
                  />
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
