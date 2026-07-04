import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAccessTokenFromRefresh } from '@/lib/api/spotify';

describe('getAccessTokenFromRefresh', () => {
  const env = process.env;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    process.env = {
      ...env,
      SPOTIFY_CLIENT_ID: 'client-id',
      SPOTIFY_CLIENT_SECRET: 'client-secret',
      SPOTIFY_REFRESH_TOKEN: 'refresh-token',
    };
  });

  afterEach(() => {
    process.env = env;
    vi.unstubAllGlobals();
  });

  it('throws when credentials are missing', async () => {
    delete process.env.SPOTIFY_CLIENT_ID;
    await expect(getAccessTokenFromRefresh()).rejects.toThrow(
      'Missing Spotify credentials'
    );
  });

  it('returns access token on success', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: 'token-123' }),
    } as Response);

    await expect(getAccessTokenFromRefresh()).resolves.toBe('token-123');
    expect(fetch).toHaveBeenCalledWith(
      'https://accounts.spotify.com/api/token',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('throws when spotify responds with error', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);
    await expect(getAccessTokenFromRefresh()).rejects.toThrow(
      'Failed to get access token from refresh token'
    );
  });
});
