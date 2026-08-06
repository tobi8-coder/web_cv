/**
 * Deployment-level configuration.
 *
 * `NEXT_PUBLIC_SITE_URL` should be set to the production origin (no trailing
 * slash) so canonical URLs, the sitemap and social cards resolve correctly.
 * Vercel exposes `VERCEL_PROJECT_PRODUCTION_URL` automatically, which we use as
 * a fallback before dropping to localhost for local development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
  name: "Pema Yeshi Tshering",
  title: "Pema Yeshi Tshering — Blockchain Developer",
  shortTitle: "Pema Yeshi Tshering",
  description:
    "Blockchain developer and final-year Computer Science undergraduate building Ethereum smart contracts, dApps and full-stack web platforms with React, Node.js and Solidity.",
  keywords: [
    "Pema Yeshi Tshering",
    "Blockchain Developer",
    "Smart Contract Developer",
    "Solidity Developer",
    "Web3 Developer",
    "dApp Developer",
    "Full-Stack Developer",
    "React Developer",
    "Bhutan Developer",
    "Ethereum",
    "Tokenization",
  ],
  locale: "en_US",
  themeColor: { light: "#ffffff", dark: "#05070f" },
} as const;

export type SiteConfig = typeof siteConfig;
