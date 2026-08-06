import { ArrowUpRight, Download, Mail, Quote } from "lucide-react";

import { ActionLink } from "@/components/ui/action-link";
import { Icon } from "@/components/ui/icon";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { profile, references, socials } from "@/lib/data";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        id="contact-title"
        eyebrow="07 — Contact"
        title="Let us build something"
        accent="worth deploying"
        description="I am finishing my degree and looking for graduate or junior roles in blockchain and full-stack engineering. The fastest way to reach me is email."
        align="center"
      />

      {/* ----------------------------------------------------------- CTAs -- */}
      <Reveal delay={0.12} className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <ActionLink href={`mailto:${profile.email}`} size="lg">
              <Mail size={16} aria-hidden="true" />
              Send me an email
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

      {/* -------------------------------------------------- contact cards -- */}
      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {socials.map((social) => {
          const isExternal = social.href.startsWith("http");
          return (
            <StaggerItem key={social.label} className="h-full">
              <SpotlightCard className="h-full">
                <a
                  href={social.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : null)}
                  className="flex h-full flex-col gap-3 rounded-2xl p-5"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-line bg-card-soft text-accent transition-transform duration-500 group-hover:scale-105">
                      <Icon name={social.icon} size={17} />
                    </span>
                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="text-subtle transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </span>
                  <span>
                    <span className="block font-mono text-[0.625rem] tracking-[0.16em] text-subtle uppercase">
                      {social.label}
                    </span>
                    <span className="mt-1.5 block text-sm leading-snug break-words text-foreground">
                      {social.handle}
                    </span>
                  </span>
                </a>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* ------------------------------------------------------ references -- */}
      <Reveal delay={0.1} className="mt-16">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl border border-line bg-card-soft text-accent">
            <Quote size={16} aria-hidden="true" />
          </span>
          <h3 className="font-display text-lg font-semibold">References</h3>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {references.map((reference) => (
            <SpotlightCard key={reference.name} className="p-5 sm:p-6">
              <p className="font-display text-[0.9375rem] font-semibold">{reference.name}</p>
              <p className="mt-1 text-[0.8125rem] text-accent">{reference.title}</p>
              {/* Referees' own contact details are shared privately, not published. */}
              <p className="mt-4 text-[0.8125rem] text-subtle">
                Contact details available on request.
              </p>
            </SpotlightCard>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
