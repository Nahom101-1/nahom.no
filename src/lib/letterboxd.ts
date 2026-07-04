export function parseLetterboxdTitle(raw: string): {
  title: string;
  year: string;
} {
  const match = raw.match(/^(.+),\s*(\d{4})(?:\s*-.*)?$/);
  if (match) return { title: match[1].trim(), year: match[2] };
  return { title: raw, year: '' };
}

export function posterUrlFromContent(content?: string): string | null {
  return content?.match(/src=["']([^"']+)["']/)?.[1] ?? null;
}

export type LetterboxdFeedItem = {
  title?: string;
  link?: string;
  guid?: string;
  isoDate?: string;
  content?: string;
  watchedDate?: string;
  memberRating?: string;
};

export function mapLetterboxdItem(item: LetterboxdFeedItem) {
  const { title, year } = parseLetterboxdTitle(item.title ?? '');
  return {
    title,
    year,
    link: item.link ?? '',
    guid: item.guid ?? '',
    dateWatched: item.watchedDate ?? item.isoDate ?? '',
    posterURL: posterUrlFromContent(item.content),
    rating: item.memberRating ? parseFloat(item.memberRating) : null,
  };
}
