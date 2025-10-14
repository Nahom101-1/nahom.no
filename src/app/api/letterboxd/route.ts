import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const feed = await new Parser().parseURL(
      `https://letterboxd.com/nahom123/rss/`
    );

    const movies = feed.items?.slice(0, 4).map(item => ({
      title: item.title || '',
      link: item.link || '',
      dateWatched: item.contentSnippet || '',
      posterURL: item.content?.match(/src=["']([^"']+)["']/)?.[1] || null,
    }));

    return NextResponse.json({ LatestWatchedMovies: movies });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
