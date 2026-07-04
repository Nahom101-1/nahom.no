import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 3600;

type LetterboxdItem = {
  memberRating?: string;
  watchedDate?: string;
};

const parser = new Parser<Record<string, never>, LetterboxdItem>({
  customFields: {
    item: [
      ['letterboxd:memberRating', 'memberRating'],
      ['letterboxd:watchedDate', 'watchedDate'],
    ],
  },
});

function parseTitle(raw: string): { title: string; year: string } {
  const match = raw.match(/^(.+),\s*(\d{4})(?:\s*-.*)?$/);
  if (match) return { title: match[1].trim(), year: match[2] };
  return { title: raw, year: '' };
}

export async function GET() {
  try {
    const username = process.env.LETTERBOXD_USER;
    if (!username) {
      return NextResponse.json({ error: 'LETTERBOXD_USER not set' }, { status: 500 });
    }

    const feed = await parser.parseURL(`https://letterboxd.com/${username}/rss/`);

    const movies = feed.items?.slice(0, 50).map(item => {
      const { title, year } = parseTitle(item.title ?? '');
      return {
        title,
        year,
        link: item.link ?? '',
        guid: item.guid ?? '',
        dateWatched: item.watchedDate ?? item.isoDate ?? '',
        posterURL: item.content?.match(/src=["']([^"']+)["']/)?.[1] ?? null,
        rating: item.memberRating ? parseFloat(item.memberRating) : null,
      };
    });

    return NextResponse.json({ LatestWatchedMovies: movies });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
