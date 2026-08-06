import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { githubUrl, navItems, profile } from "@/lib/data";

const year = new Date().getFullYear();
const linkedIn = "https://linkedin.com/in/pema-yeshi-tshering";

export function Footer() {
  return (
    <footer className="no-print relative mt-8 border-t border-line">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* ------------------------------------------------------ brand -- */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--accent),var(--accent-3)_55%,var(--accent-2))] font-display text-[0.8125rem] font-bold text-white">
                PT
              </span>
              <div className="leading-tight">
                <p className="font-display text-[0.9375rem] font-semibold">
                  {profile.name}
                </p>
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-subtle uppercase">
                  {profile.role}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Building on-chain systems and the interfaces that make them
              approachable. Currently finishing a Computer Science degree in
              Bhutan and open to new work.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="surface grid size-9 place-items-center rounded-full text-muted transition-colors duration-300 hover:border-line-strong hover:text-accent"
              >
                <LinkedInIcon size={15} />
              </a>
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="surface grid size-9 place-items-center rounded-full text-muted transition-colors duration-300 hover:border-line-strong hover:text-accent"
                >
                  <GitHubIcon size={15} />
                </a>
              ) : null}
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.name}`}
                className="surface grid size-9 place-items-center rounded-full text-muted transition-colors duration-300 hover:border-line-strong hover:text-accent"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* ------------------------------------------------- quick links -- */}
          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.2em] text-subtle uppercase">
              Navigate
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-y-2.5 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ----------------------------------------------------- contact -- */}
          <div>
            <h2 className="font-mono text-[0.6875rem] tracking-[0.2em] text-subtle uppercase">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 break-all text-muted transition-colors duration-300 hover:text-accent"
                >
                  <Mail size={14} aria-hidden="true" className="shrink-0" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="text-muted transition-colors duration-300 hover:text-accent"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-muted">
                <MapPin size={14} aria-hidden="true" className="shrink-0" />
                {profile.location}
              </li>
            </ul>

            <a
              href={profile.cv}
              download
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity duration-300 hover:opacity-75"
            >
              Download CV (PDF)
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-subtle">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-subtle">
            Built with Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
