# Copilot code review instructions

This is a Next.js 16 portfolio site with Sanity CMS, bilingual EN/NO support, and Vitest tests.

When reviewing pull requests:

- Prefer minimal, focused diffs. Flag unrelated changes.
- Site copy belongs in Sanity (`*No` fields for Norwegian) or `scripts/seed.mjs`, not hard-coded in components.
- UI chrome (nav labels, section titles) lives in `siteSettings` and is read via `label()` / `pick()` from `@/lib/cms` and `@/lib/lang`.
- New Sanity fields need updates to `sanity/schema.ts`, `src/types/sanity.ts`, `SITE_SETTINGS_QUERY`, seed script, and section components.
- Tests go in `tests/` mirroring `src/`. Run `npm test` before merging.
- Use `@/` imports. Match existing Tailwind v4 and Motion patterns.
- No em dashes in visitor-facing copy. Keep prose plain and simple.
