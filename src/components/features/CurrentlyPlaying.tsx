'use client';
import { useState, useEffect } from 'react';
import TiltedCard from '@/components/effects/TiltedCard';

interface NowPlayingData {
  playing: boolean;
  artist?: string;
  track?: string;
  album?: string;
  albumArt?: string;
  url?: string | null;
  error?: string;
}

export default function CurrentlyPlaying() {
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = async () => {
    try {
      const response = await fetch('/api/now-playing');
      const data = await response.json();
      setCurrentlyPlaying(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) return null;
  if (isLoading || !currentlyPlaying) return null;
  if (!currentlyPlaying.playing || !currentlyPlaying.albumArt) return null;

  const itemName = currentlyPlaying.track || '';
  const itemArtists = currentlyPlaying.artist || '';
  const itemAlbum = currentlyPlaying.album || '';
  const itemImage =
    currentlyPlaying.albumArt || '/images/default-album-dark.jpg';
  const itemKey = currentlyPlaying.url || itemName;

  return (
    <section
      aria-label='Currently Playing'
      className='flex flex-col items-start gap-4 scale-[0.35] sm:scale-[0.4] md:scale-[0.45] lg:scale-[0.5] origin-bottom-right'
    >
      <div onClick={refresh} className='cursor-pointer'>
        <TiltedCard
          imageSrc={itemImage}
          altText={`${itemName} album cover`}
          captionText={`${itemName} - ${itemArtists}`}
          containerHeight='400px'
          containerWidth='400px'
          imageHeight='400px'
          imageWidth='400px'
          rotateAmplitude={10}
          scaleOnHover={1.03}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={false}
          overlayContent={null}
        />
      </div>
      <div
        className='flex flex-col text-left mb-2 bg-transparent w-[400px] -mt-2'
        key={itemKey}
      >
        <h2 className='text-white font-bold text-3xl leading-tight max-w-xl break-words'>
          {itemName}
        </h2>
        {itemArtists && (
          <div className='text-gray-300 font-semibold text-2xl leading-tight max-w-xl break-words'>
            {itemArtists}
          </div>
        )}
        {itemAlbum && (
          <div className='text-gray-400 text-lg max-w-xl break-words'>
            {itemAlbum}
          </div>
        )}
      </div>
    </section>
  );
}
