import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { parseURL } = vi.hoisted(() => ({
  parseURL: vi.fn(),
}));

vi.mock('rss-parser', () => ({
  default: class {
    parseURL = parseURL;
  },
}));

import { GET } from '@/app/api/letterboxd/route';

describe('GET /api/letterboxd', () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env, LETTERBOXD_USER: 'nahom' };
    parseURL.mockReset();
  });

  afterEach(() => {
    process.env = env;
  });

  it('returns 500 when LETTERBOXD_USER is missing', async () => {
    delete process.env.LETTERBOXD_USER;
    const res = await GET();
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: 'LETTERBOXD_USER not set',
    });
  });

  it('maps rss feed items', async () => {
    parseURL.mockResolvedValue({
      items: [
        {
          title: 'Past Lives, 2023',
          link: 'https://letterboxd.com/film/past-lives/',
          guid: 'abc',
          watchedDate: '2026-01-01',
          memberRating: '4.5',
          content: '<img src="https://a.ltrbxd.com/poster.jpg" />',
        },
      ],
    });

    const res = await GET();
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      LatestWatchedMovies: [
        {
          title: 'Past Lives',
          year: '2023',
          link: 'https://letterboxd.com/film/past-lives/',
          guid: 'abc',
          dateWatched: '2026-01-01',
          posterURL: 'https://a.ltrbxd.com/poster.jpg',
          rating: 4.5,
        },
      ],
    });
    expect(parseURL).toHaveBeenCalledWith('https://letterboxd.com/nahom/rss/');
  });

  it('returns 500 when feed fetch fails', async () => {
    parseURL.mockRejectedValue(new Error('network'));
    const res = await GET();
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: 'Failed to fetch movies',
    });
  });
});
