# CLAUDE.md — nahom.no

Personal portfolio for Nahom Berhane. Next.js 16 App Router + Sanity CMS + Tailwind CSS v4.

It is a **single-page, scroll-driven site** (the "Gallery" design). `src/app/page.tsx`
fetches everything from Sanity and assembles the page from section components in
`src/components/features/`. There is no multi-route navigation — the navbar links are
in-page anchors (`#work`, `#about`, …).

## Dev Commands

```bash
npm run dev          # Start dev server (Turbopack) — http://localhost:3000
npm run build        # Production build (also type-checks)
npm run lint         # ESLint (plain `eslint .` flat config — `next lint` is gone in Next 16)
npm run format       # Prettier write
npm run seed         # Push all content to Sanity (scripts/seed.mjs — local-only, git-ignored)
```

## Key Conventions

- **Package manager**: npm (there is a `package-lock.json`; do not switch to pnpm/yarn)
- **Imports**: Use `@/` path alias for everything under `src/`
- **Styling**: Tailwind CSS v4 — no `tailwind.config.ts`, config lives in `postcss.config.mjs`. Design tokens (`--ds-*`) are defined in `src/app/globals.css` for both light and dark themes
- **No comments**: Don't add comments unless the WHY is genuinely non-obvious
- **No extra abstractions**: Match the existing flat, direct style

## Architecture

- **Page**: `src/app/page.tsx` is the whole site — it fetches Sanity data once and renders the ordered section list. Each section is a self-contained component in `src/components/features/` (HeroSection, MarqueeStrip, AboutSection, WorkSection, ExperienceSection, ToolkitSection, EducationSection, OffTheClock, ContactSection, FooterSection)
- **Fallbacks**: Every section has hard-coded default content so the site renders fully even with an empty Sanity dataset. When editing copy, prefer adding a Sanity field over hard-coding
- **CMS**: Sanity v5. Schema in `sanity/schema.ts`, studio config + desk structure in `sanity.config.ts`, client + GROQ queries in `src/lib/sanity.ts`, studio embedded at `/studio`
- **Components**: `features/` = page sections, `layout/` = navbar, `ui/` = shadcn primitives (only `card` remains, used by `not-found`)
- **Theme**: `next-themes`, dark by default, system detection off. `ThemeToggle` flips it
- **API routes**: `src/app/api/now-playing/` (Spotify) and `src/app/api/letterboxd/` (RSS proxy). Both feed the client-side `OffTheClock` section
- **Animations**: Motion (Framer Motion) only. Shared entrance variants live in `src/lib/motion.ts` (`rv`, `rvViewport`, `EASE`). GSAP / Three.js / Lenis were removed with the old design

## Sanity

- **`siteSettings` is a singleton** (`/studio` → Site Settings) holding all changeable site copy, grouped into tabs: Identity & Hero, About, Skills & Marquee, Contact & Footer, Sections. Add new editable copy here rather than hard-coding it
- Content lists: `workExperience`, `project`, `education`, `relevantClasses` (each links to an `education`), and the `resume` singleton (two files: `file`/`label` = English résumé, `fileNo`/`labelNo` = Norwegian CV)
- **Seeding**: `scripts/seed.mjs` (git-ignored, local-only) writes all content with `createOrReplace` and deterministic `_id`s — idempotent, safe to re-run. Media goes in `scripts/assets/` by convention (see its README). Requires `SANITY_API_WRITE_TOKEN`. Keep it in sync when content changes: it is the source of truth for re-seeding
- **Never** mutate schema types without considering existing documents in the `production` dataset
- GROQ queries are co-located in `src/lib/sanity.ts`; add new queries there. `SITE_SETTINGS_QUERY` must be extended when you add a `siteSettings` field
- `revalidate = 3600` is set on `src/app/page.tsx` and the Letterboxd route

## Environment Variables

Defined in `.env.example`. A `.env.local` must exist locally with real values. Never commit secrets. None are required to render (sections fall back to defaults), but they unlock live data:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_WRITE_TOKEN` (Editor token — only used by `npm run seed`, never by the site)
- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` / `SPOTIFY_REFRESH_TOKEN` (now-playing; regenerate the refresh token with `node --env-file=.env.local scripts/spotify-token.mjs`, redirect URI must be `http://127.0.0.1:8888/callback`)
- `LETTERBOXD_USER` (recently-watched)

## Known Quirks

- Image domains allowed in `next.config.ts`: `cdn.sanity.io` (CMS images), `a.ltrbxd.com` (Letterboxd posters), `i.scdn.co` (Spotify album art)
- The `OffTheClock` section is client-rendered and polls `/api/now-playing` every 30s; it can be hidden via the `offClockEnabled` toggle in Site Settings
- `education.gpa` is a string (e.g. "B" or "4.2"), not a number — and the owner prefers showing just the letter ("B"), never the exact average
- Site copy should be **simple and plain** — no jokes, no marketing flourishes, no em dashes in visitor-facing text
- `scripts/` is deliberately git-ignored (seed + Spotify token helpers with personal content live only on this machine)
- The favicon is `src/app/icon.svg` (App Router file convention — no metadata config needed)
