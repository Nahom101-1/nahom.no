import { describe, expect, it } from 'vitest';
import {
  mapLetterboxdItem,
  parseLetterboxdTitle,
  posterUrlFromContent,
} from '@/lib/letterboxd';

describe('parseLetterboxdTitle', () => {
  it('parses title and year', () => {
    expect(parseLetterboxdTitle('Past Lives, 2023')).toEqual({
      title: 'Past Lives',
      year: '2023',
    });
  });

  it('handles titles with extra suffix', () => {
    expect(parseLetterboxdTitle('Dune: Part Two, 2024 - Letterboxd')).toEqual({
      title: 'Dune: Part Two',
      year: '2024',
    });
  });

  it('returns raw title when pattern does not match', () => {
    expect(parseLetterboxdTitle('Untitled')).toEqual({
      title: 'Untitled',
      year: '',
    });
  });
});

describe('posterUrlFromContent', () => {
  it('extracts poster src from html content', () => {
    expect(
      posterUrlFromContent('<img src="https://a.ltrbxd.com/poster.jpg" />')
    ).toBe('https://a.ltrbxd.com/poster.jpg');
  });

  it('returns null when no poster is present', () => {
    expect(posterUrlFromContent(undefined)).toBeNull();
  });
});

describe('mapLetterboxdItem', () => {
  it('maps rss item fields', () => {
    expect(
      mapLetterboxdItem({
        title: 'Past Lives, 2023',
        link: 'https://letterboxd.com/film/past-lives/',
        guid: 'abc',
        watchedDate: '2026-01-01',
        memberRating: '4.5',
        content: '<img src="https://a.ltrbxd.com/poster.jpg" />',
      })
    ).toEqual({
      title: 'Past Lives',
      year: '2023',
      link: 'https://letterboxd.com/film/past-lives/',
      guid: 'abc',
      dateWatched: '2026-01-01',
      posterURL: 'https://a.ltrbxd.com/poster.jpg',
      rating: 4.5,
    });
  });
});
