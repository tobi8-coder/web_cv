import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";

import "./globals.css";

import { Background } from "@/components/layout/background";
import { BackToTop } from "@/components/layout/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Preloader } from "@/components/layout/preloader";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { profile, socials } from "@/lib/data";
import { siteConfig } from "@/lib/site";

/**
 * Font loading is deliberately narrow. Inter carries the whole weight axis
 * because body copy uses several weights, but Sora and JetBrains Mono are
 * pinned to the exact weights the design uses — measured over the wire, three
 * static Sora cuts plus one mono cut are lighter than the equivalent variable
 * files, which would ship every weight in between unused.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 500 for the hero role line, 600 for headings, 700 for the "PT" monogram.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

// Micro-labels, years and percentages only ever render at regular weight.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.shortTitle}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  applicationName: `${siteConfig.name} — Portfolio`,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Blockchain Developer`,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.themeColor.dark },
  ],
};

/** Structured data so search engines understand who the page is about. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${profile.avatar}`,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: { "@type": "PostalAddress", addressLocality: "Thimphu", addressCountry: "BT" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Gyalpozhing College of Information and Technology",
  },
  knowsAbout: [
    "Blockchain",
    "Solidity",
    "Smart Contracts",
    "Ethereum",
    "Decentralized Applications",
    "React",
    "Node.js",
    "TypeScript",
  ],
  knowsLanguage: ["Dzongkha", "English", "Hindi", "Sharchop", "Nepali"],
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Preloader />
          <ScrollProgress />
          <Background />

          <a
            href="#about"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-contrast"
          >
            Skip to content
          </a>

          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>

        <script
          type="application/ld+json"
          // Static, developer-authored JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
