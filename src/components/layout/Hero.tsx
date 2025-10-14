'use client';

import { Poster } from '@/types/sanity';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SplitText from '@/components/effects/SplitText';
import CurrentlyPlaying from '../features/CurrentlyPlaying';
import { Navbar } from './navbar';
const FADE_DURATION = 1500;
const SLIDE_INTERVAL = 4000;

export default function HeroSection({ posters }: { posters: Poster[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Effect to handle automatic image cycling
  useEffect(() => {
    // Don't start cycling if no posters
    if (!posters || posters.length === 0) {
      return;
    }

    const slideTimer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % posters.length);
        setIsFading(false);
      }, FADE_DURATION);
    }, SLIDE_INTERVAL + FADE_DURATION);

    return () => {
      clearInterval(slideTimer);
    };
  }, [posters]);
  // Handle case where no posters are provided
  if (!posters || posters.length === 0) {
    return (
      <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-gray-900'>
        <div className='absolute inset-0 z-10 bg-black/60' />
        <div className='relative z-20 flex h-full flex-col items-center justify-center px-4'>
          <h1 className='text-xl md:text-2xl font-semibold text-center text-white'>
            Nahom
          </h1>
          <p className='mt-2 text-white text-opacity-80 text-center'>
            No posters available to display.
          </p>
        </div>
      </div>
    );
  }

  try {
    const currentPosterData = posters[currentIndex];
    const currentImageUrl = currentPosterData?.image
      ? urlFor(currentPosterData.image)
      : '';

    // Preload the next image for smoother transition
    const nextIndex = (currentIndex + 1) % posters.length;
    const nextPosterData = posters[nextIndex];
    const nextImageUrl = nextPosterData?.image
      ? urlFor(nextPosterData.image)
      : '';

    return (
      <div className='relative h-[100dvh] w-full overflow-hidden'>
        {/* Background Image Container */}
        <div
          className='absolute inset-0 bg-cover bg-[center_top] md:bg-center transition-opacity duration-[1500ms] ease-in-out bg-no-repeat'
          style={{
            backgroundImage: `url(${currentImageUrl})`,
            opacity: isFading ? 0 : 1,
          }}
        />

        {/* Overlay to darken the background image */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60' />
        <div className='absolute top-8 left-0 right-0 z-20 w-full px-16 md:px-20'>
          <SplitText
            text='Nahom Berhane'
            className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center text-white tracking-tight'
            delay={100}
            duration={0.6}
            ease='power3.out'
            splitType='chars'
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin='-100px'
            textAlign='center'
          />
        </div>

        {/* Preload next image */}
        {nextImageUrl && (
          <Image
            src={nextImageUrl}
            alt='Preload next background'
            width={1}
            height={1}
            style={{ display: 'none' }}
            priority
          />
        )}
        <Navbar />

        {/* CurrentlyPlaying - only shown when posters are available */}
        <div className='fixed md:absolute bottom-0 left-0 md:left-auto md:right-0 p-4 md:p-8 z-50 w-full md:w-auto'>
          <CurrentlyPlaying />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-gray-900'>
        <div className='absolute inset-0 z-10 bg-black/60' />
        <div className='relative z-20 flex h-full flex-col items-center justify-center px-4'>
          <h1 className='text-xl md:text-2xl font-semibold text-center text-white'>
            Error
          </h1>
          <p className='mt-2 text-white text-opacity-80 text-center'>
            Something went wrong loading the hero section.
          </p>
          <p className='mt-1 text-sm text-white text-opacity-60 text-center break-words max-w-full'>
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }
}
