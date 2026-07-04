import Parser from 'rss-parser';
import { NextResponse } from 'next/server';
import { mapLetterboxdItem } from '@/lib/letterboxd';

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

export async function GET() {
  try {
    const username = process.env.LETTERBOXD_USER;
    if (!username) {
      return NextResponse.json(
        { error: 'LETTERBOXD_USER not set' },
        { status: 500 }
      );
    }

    const feed = await parser.parseURL(
      `https://letterboxd.com/${username}/rss/`
    );

    const movies = feed.items
      ?.slice(0, 50)
      .map(item => mapLetterboxdItem(item));

    return NextResponse.json({ LatestWatchedMovies: movies });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
