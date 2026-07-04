# Security

## Reporting

If you find a security issue, email [nahom@berhane.no](mailto:nahom@berhane.no). Do not open a public issue for sensitive reports.

## Secrets

Never commit `.env`, `.env.local`, or API tokens. The repository uses GitHub secret scanning and push protection.

## Dependencies

Dependabot opens weekly update PRs. CI runs `npm audit` on production dependencies before merge.

## Production

Environment variables for Sanity, Spotify, and Letterboxd are set in Vercel, not in this repository.
