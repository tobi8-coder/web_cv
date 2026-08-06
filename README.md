# Pema Yeshi Tshering — Portfolio / Web CV

A production-ready personal portfolio built from `Pema_Yeshi_Tshering_CV.pdf`.
Single-page, fully responsive, light + dark themes, animated with Framer Motion,
statically rendered by Next.js.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion 13 · next-themes · lucide-react

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script              | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Dev server (Turbopack)                           |
| `npm run build`     | Production build — all routes prerender to static |
| `npm start`         | Serve the production build                        |
| `npm run lint`      | ESLint (`eslint-config-next` flat config)         |
| `npm run typecheck` | `tsc --noEmit`                                    |

---

## Editing the content

**All CV content lives in [`lib/data.ts`](lib/data.ts).** Components never hold
copy, so updating the CV means editing that one file. It is fully typed, so a
mistake shows up in `npm run typecheck` rather than in the browser.

Things you will most likely want to change:

| What                            | Where                                                        |
| ------------------------------- | ------------------------------------------------------------ |
| Name, role, tagline, email      | `profile` in `lib/data.ts`                                   |
| Rotating job titles in the hero | `profile.roleRotation`                                        |
| Hero stat counters              | `stats`                                                       |
| Skill groups and **bar levels**  | `skillGroups`                                                 |
| Jobs, education, projects       | `experiences`, `education`, `projects`                        |
| Certifications, awards, languages | `certifications`, `achievements`, `languages`                |
| Referees                        | `references`                                                  |
| Nav / section order             | `navItems` + `app/page.tsx`                                   |
| Site title, description, keywords | `lib/site.ts`                                                |

### Two things worth reviewing before you publish

1. **Skill percentages are my estimate, not yours.** The CV lists skills without
   proficiency levels, so the numbers in `skillGroups` were inferred from how
   prominently each one features. Tune them in `lib/data.ts` — they drive the
   animated bars directly.
2. **Project tech tags are partly inferred.** The CV describes each project but
   does not list stacks, so tags like `React` or `Ethers` were derived from the
   descriptions. Adjust `projects[].stack` to match what you actually used.

### Adding project links

The CV lists no public URLs, so project cards ship without link buttons. Add a
`links` object and the buttons appear automatically:

```ts
{
  title: "Bond Tokenization Platform",
  links: { repo: "https://github.com/you/bond-tokenization", demo: "https://…" },
}
```

Same for GitHub: set `githubUrl` in `lib/data.ts` and the icon appears in the
nav, mobile menu, contact grid and footer.

### Replacing the CV and photo

- **CV:** overwrite `public/Pema_Yeshi_Tshering_CV.pdf`. If you rename it, update
  `profile.cv` and the cache header in `next.config.ts`.
- **Photo:** overwrite `public/profile.jpg` (square, ~600×600 or larger). It is
  imported statically in `components/sections/hero.tsx`, so Next generates the
  blur placeholder and AVIF/WebP variants at build time.

---

## Deploying

### Vercel (recommended)

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is detected,
   no build settings needed.
3. Set one environment variable:

   ```
   NEXT_PUBLIC_SITE_URL = https://your-domain.com
   ```

   This drives the canonical URL, `sitemap.xml`, `robots.txt` and the social
   card. Without it the build falls back to Vercel's generated domain, and then
   to `http://localhost:3000` locally.

### Anywhere else

`npm run build` produces a standard Next.js server build (`npm start`), which
runs on Netlify, Cloudflare, Render, Fly, a VPS, or Docker. Nothing here needs a
database or a runtime API, so a static host works too — add
`output: "export"` to `next.config.ts` if you want plain files (note: this
disables on-demand image optimisation, so pre-size `profile.jpg`).

---

## How it is put together

```
app/
  layout.tsx            Fonts, metadata, JSON-LD Person schema, global chrome
  page.tsx              Section order
  globals.css           Design tokens, both themes, keyframes, custom utilities
  opengraph-image.tsx   Social card, generated at build time
  icon.svg              Favicon
  sitemap.ts robots.ts manifest.ts
components/
  layout/               Navbar, footer, preloader, scroll progress, back-to-top,
                        theme toggle, decorative background
  sections/             One file per page section
  ui/                   Reusable primitives (Reveal, Counter, SkillBar,
                        SpotlightCard, Timeline, Marquee, ActionLink, Chip…)
lib/
  data.ts               All CV content (single source of truth)
  site.ts               Deployment config
  hooks.ts utils.ts
public/                 CV PDF + portrait
```

### Design system

Colour, elevation and motion are CSS custom properties on `:root` / `.dark` in
`globals.css`, mapped into Tailwind's token space with `@theme inline`. That
means `bg-card`, `text-muted`, `border-line` and friends resolve correctly in
both themes with no `dark:` variants scattered through the components.

### Performance notes

- **Server components by default.** Only five leaves are client components
  (nav, theme toggle, preloader, scroll progress, projects filter) plus the
  animation primitives. Section copy is server-rendered and passed to animated
  wrappers as children, so text never enters the JS bundle.
- **Composited animations only.** Every entrance and progress animation drives
  `transform` or `opacity`. The skill bars use `scaleX` on a fixed-width fill
  and the timeline rails use `scaleY`, rather than animating `width`/`height`,
  so nothing triggers layout during a scroll.
- **The marquee is pure CSS** — no measurement, no JS.
- `optimizePackageImports` tree-shakes `lucide-react` and `framer-motion` so a
  handful of icons does not pull in the whole library.
- All routes prerender to static HTML at build time.

### Accessibility

- Semantic landmarks, one `<h1>`, every section labelled by its own heading.
- Skip-to-content link; visible focus rings on all interactive elements.
- `prefers-reduced-motion` is honoured throughout: the intro curtain never
  plays, scroll reveals collapse to a short fade (content is never left
  invisible), the role rotator freezes, and smooth scrolling becomes instant.
- Skill bars expose `role="progressbar"` with real values; the project filter
  announces its result count via `aria-live`.
- The rotating hero role is `aria-hidden` with the full list of titles available
  to screen readers as static text, so assistive tech is not read a value that
  changes every three seconds.
- The theme toggle swaps its accessible name with CSS (not state), so it is
  correct from the first paint.

### Two layout details that are load-bearing

Both were found by measuring the rendered page across breakpoints, and both are
easy to reintroduce by accident:

- **`overflow-x: clip` on `html` *and* `body`.** `overflow-x` on `body` alone
  propagates to the viewport and is effectively ignored, so a wide child still
  produces a horizontal scrollbar. `clip` is used instead of `hidden` because
  `hidden` would turn the root into a scroll container and break `position:
  sticky` and smooth scrolling.
- **The dashed ring around the hero portrait does not rotate.** A spinning
  rounded square sweeps a bounding box up to 1.41× its width, which pushed
  narrow viewports into horizontal scroll at certain angles. The conic gradient
  ring supplies the motion instead.

---

## Verified

`npm run build`, `npm run lint` and `npm run typecheck` all pass clean. Beyond
that, the built site was loaded in a real browser (Chromium/Edge) and measured:

**Responsive** — rendered at **320 / 390 / 768 / 1280 / 1920 px** in both light
and dark mode. `scrollWidth === clientWidth` at every width (no horizontal
scroll anywhere), no element escaping the viewport, no console errors, no text
below 11px.

**Core Web Vitals** (production build, local server, hero image included)

| Metric | Desktop 1280 | Mobile 390 |
| ------ | ------------ | ---------- |
| FCP    | ~0.4 s       | ~0.2 s     |
| LCP    | ~1.5 s       | ~1.3 s     |
| CLS    | **0**        | **0**      |

LCP is the hero portrait and is gated by the intro curtain, which occludes it —
see `HOLD_MS` in `components/layout/preloader.tsx` if you want it faster still.

**Page weight** — 355 kB total over the wire, gzipped: 34.5 kB HTML,
196 kB JS, ~123 kB CSS + fonts, and the portrait. The JS is dominated by React
and Framer Motion; the animation brief is what buys that. If you ever want it
smaller, `LazyMotion` with the `m` components is the lever.

**Degradation**

- With `prefers-reduced-motion: reduce`: no element is left below 0.9 opacity,
  i.e. nothing is stranded invisible by a reveal that never runs.
- With **JavaScript disabled**: all 8 sections, every project, the contact
  details and the referees render from the server HTML, exactly one `<h1>`, and
  no overlay blocks the page.
- Heading outline: 32 headings, one `<h1>`, no skipped levels.
