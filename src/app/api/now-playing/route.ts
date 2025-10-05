import { getAccessTokenFromRefresh } from '@/lib/api/spotify';
import { NextResponse } from 'next/server';

const url = new URL('https://api.spotify.com/v1/me/player/currently-playing');

export async function GET() {
  try {
    const accessToken = await getAccessTokenFromRefresh();

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // No content means no track is playing
    if (response.status === 204) {
      return NextResponse.json({ playing: false });
    }

    // Handle error responses
    if (!response.ok) {
      throw new Error(`Spotify API returned ${response.status}`);
    }

    const data = await response.json();

    // Handle non-track items
    if (data.currently_playing_type !== 'track') {
      return NextResponse.json({
        playing: data.is_playing,
        error: `Currently playing type is ${data.currently_playing_type}`,
      });
    }

    // Return structured response
    return NextResponse.json({
      playing: data.is_playing,
      artist: data.item?.artists?.[0]?.name,
      track: data.item?.name,
      album: data.item?.album?.name,
      albumArt: data.item?.album?.images?.[0]?.url,
      progressMs: data.progress_ms,
      durationMs: data.item?.duration_ms,
      url: data.item?.external_urls?.spotify || null,
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      {
        playing: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch now playing data',
      },
      { status: 500 }
    );
  }
}
