'use client';

import { Poster } from '@/types/sanity';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SplitText from '../SplitText';
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
        <div className='relative z-20 flex h-full flex-col items-center justify-center'>
          <h1 className='text-2xl font-semibold text-center text-white'>
            Nahom
          </h1>
          <p className='mt-2 text-white text-opacity-80'>
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
      <div className='relative h-screen w-full overflow-hidden'>
        {/* Background Image Container */}
        <div
          className='absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out'
          style={{
            backgroundImage: `url(${currentImageUrl})`,
            opacity: isFading ? 0 : 1,
          }}
        />

        {/* Overlay to darken the background image */}
        <div className='absolute inset-0 bg-black/40' />
        <div className='absolute top-16 left-1/2 transform -translate-x-1/2 z-20'>
          <SplitText
            text='Nahom Berhane'
            className='text-6xl font-semibold text-center text-white'
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
        <div className='absolute bottom-0 right-0 p-8 z-50'>
          <CurrentlyPlaying />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-gray-900'>
        <div className='absolute inset-0 z-10 bg-black/60' />
        <div className='relative z-20 flex h-full flex-col items-center justify-center'>
          <h1 className='text-2xl font-semibold text-center text-white'>
            Error
          </h1>
          <p className='mt-2 text-white text-opacity-80'>
            Something went wrong loading the hero section.
          </p>
          <p className='mt-1 text-sm text-white text-opacity-60'>
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }
}
