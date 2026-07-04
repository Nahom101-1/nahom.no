# nahom.no

Personal portfolio for Nahom Berhane — software developer based in Gjøvik, Norway.

A single-page, scroll-driven "Gallery" site: a light/dark editorial layout assembled
from section components, with all changeable content driven by Sanity.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| CMS | Sanity v5 (embedded studio at `/studio`) |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion v12) |
| Theme | `next-themes` (dark by default) |
| External APIs | Spotify (now playing), Letterboxd RSS (recent watches) |
| Linting / Fmt | ESLint + Prettier |

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                  # Turbopack dev server
```

Open [http://localhost:3000](http://localhost:3000). The Sanity Studio is at
[http://localhost:3000/studio](http://localhost:3000/studio).

## Environment Variables

See `.env.example`. None are strictly required to render the site — every section
falls back to sensible defaults — but they unlock live content:

```bash
# Sanity CMS (content)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=          # only for the local content seed script

# Spotify — "Off the clock" now-playing widget
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Letterboxd — "Off the clock" recently-watched widget
LETTERBOXD_USER=
```

## Project Structure

```
nahom.no/
├── sanity/
│   └── schema.ts                # Sanity document types
├── sanity.config.ts             # Studio config + desk structure
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Fonts + ThemeProvider
│   │   ├── page.tsx             # Single-page assembly of all sections
│   │   ├── not-found.tsx
│   │   ├── globals.css          # Gallery design tokens (light + dark)
│   │   ├── api/
│   │   │   ├── letterboxd/      # Letterboxd RSS proxy
│   │   │   └── now-playing/     # Spotify now-playing endpoint
│   │   └── (routes)/
│   │       └── studio/          # Embedded Sanity Studio
│   ├── components/
│   │   ├── features/            # One file per page section
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MarqueeStrip.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── WorkSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ToolkitSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── OffTheClock.tsx  # Spotify + Letterboxd
│   │   │   ├── ContactSection.tsx
│   │   │   └── FooterSection.tsx
│   │   ├── layout/navbar.tsx
│   │   ├── ui/card.tsx          # shadcn primitive (used by not-found)
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   ├── api/spotify.ts       # Spotify refresh-token → access-token
│   │   ├── sanity.ts            # Sanity client + GROQ queries
│   │   ├── motion.ts            # Shared Framer Motion variants
│   │   └── utils.ts             # cn(), ageFrom()
│   └── types/
│       ├── letterBoxItem.ts
│       └── sanity.ts
├── .env.example
├── next.config.ts
└── package.json
```

## Sanity Content Model

The studio (`/studio`) is organized into one **Site Settings** singleton plus four
content lists. Document types in `sanity/schema.ts`:

| Type | Purpose |
|------|---------|
| `siteSettings` | Singleton holding all changeable site copy — name, role, birth date (→ age), location, tagline, hero highlights, about text + portrait, spoken languages, skill groups, marquee words, contact links/labels, footer note, and section toggles |
| `workExperience` | Each role: company, position, dates, badge, description, technologies, learnings |
| `project` | Each project: title, year, description, stack, screenshot, link, display order |
| `education` | Degree, institution, dates, GPA/average grade, location |
| `relevantClasses` | A class linked to an `education` entry: code, name, grade, year |
| `resume` | Singleton with English + Norwegian PDF uploads and download labels |

Everything subject to change (age, location, grades, languages, work, etc.) lives in
Sanity, so the site can be updated without touching code. Each section also ships a
hard-coded fallback so the site renders fully before any content is added.

## Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build (also type-checks)
npm run start        # Start production server
npm run lint         # ESLint
npm run format       # Prettier write
npm run format:check # Prettier check (CI)
npm run seed         # Push content to Sanity (scripts/seed.mjs — local only, git-ignored)
```
