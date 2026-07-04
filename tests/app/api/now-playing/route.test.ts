import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from '@/app/api/now-playing/route';

vi.mock('@/lib/api/spotify', () => ({
  getAccessTokenFromRefresh: vi.fn(),
}));

import { getAccessTokenFromRefresh } from '@/lib/api/spotify';

describe('GET /api/now-playing', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.mocked(getAccessTokenFromRefresh).mockResolvedValue('token-123');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('returns playing false when spotify has no content', async () => {
    vi.mocked(fetch).mockResolvedValue({ status: 204 } as Response);
    const res = await GET();
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ playing: false });
  });

  it('returns track data for a playing song', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        is_playing: true,
        currently_playing_type: 'track',
        progress_ms: 1000,
        item: {
          name: 'Track',
          duration_ms: 200000,
          artists: [{ name: 'Artist' }],
          album: { name: 'Album', images: [{ url: 'https://img.test/a.jpg' }] },
          external_urls: { spotify: 'https://open.spotify.com/track/1' },
        },
      }),
    } as Response);

    const res = await GET();
    await expect(res.json()).resolves.toEqual({
      playing: true,
      artist: 'Artist',
      track: 'Track',
      album: 'Album',
      albumArt: 'https://img.test/a.jpg',
      progressMs: 1000,
      durationMs: 200000,
      url: 'https://open.spotify.com/track/1',
    });
  });

  it('returns playing false on failure', async () => {
    vi.mocked(getAccessTokenFromRefresh).mockRejectedValue(
      new Error('auth failed')
    );
    const res = await GET();
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toMatchObject({
      playing: false,
      error: 'auth failed',
    });
  });
});
