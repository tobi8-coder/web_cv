import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { ActionLink } from "@/components/ui/action-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-[0.6875rem] tracking-[0.24em] text-subtle uppercase">
        Error 404
      </p>
      <h1 className="mt-5 text-[clamp(2.5rem,1.6rem+4vw,4.5rem)] leading-none font-semibold">
        <span className="text-gradient">Nothing here</span>
      </h1>
      <p className="mt-5 max-w-md text-base text-muted">
        That page does not exist. Everything on this site lives on one page — head back and
        keep scrolling.
      </p>
      <div className="mt-9">
        <ActionLink href="/" size="lg">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to the portfolio
        </ActionLink>
      </div>
    </section>
  );
}
