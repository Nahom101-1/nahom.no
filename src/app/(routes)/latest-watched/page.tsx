'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Loader2, Star } from 'lucide-react';
import { LetterboxdFeed } from '@/types/letterBoxItem';
import TiltedCard from '@/components/effects/TiltedCard';

export default function LatestWatched() {
  const [movies, setMovies] = useState<LetterboxdFeed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/letterboxd')
      .then(res => res.json())
      .then(data => {
        if (data.LatestWatchedMovies?.length) {
          setMovies(data.LatestWatchedMovies);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />
      <main className='container mx-auto px-4 py-6 sm:py-8 md:py-12'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8'>
          Latest Watched
        </h1>

        {loading ? (
          <div className='flex items-center justify-center min-h-[50vh]'>
            <Loader2 className='w-6 h-6 animate-spin' />
          </div>
        ) : (
          <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 place-items-center'>
            {movies.map((movie, index) => {
              if (movie.posterURL === null || movie.title === null) return null;

              const overlayContent = (
                <div className='w-full h-full flex flex-col justify-end p-3 sm:p-4'>
                  <p className='text-xs sm:text-sm font-bold mb-1'>
                    {movie.title}
                  </p>
                  {movie.rating && (
                    <div className='flex items-center gap-1'>
                      <Star className='w-3 h-3 text-yellow-400' />
                      <span className='text-[10px] sm:text-xs text-yellow-400'>
                        {movie.rating}/5
                      </span>
                    </div>
                  )}
                </div>
              );
              return (
                <TiltedCard
                  key={movie.guid || index.toString()}
                  imageSrc={movie.posterURL}
                  altText={movie.title}
                  captionText={movie.title}
                  containerHeight='300px'
                  containerWidth='150px'
                  imageHeight='200px'
                  imageWidth='150px'
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={false}
                  overlayContent={overlayContent}
                  displayOverlayContent={true}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
