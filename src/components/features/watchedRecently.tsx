'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
type Item = {
  title: string;
  year: string;
  link: string;
  date: string;
  rating: number;
  rewatch: boolean;
  posterUrl: string | null;
};

export default function WatchedRecently() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch('/api/letterboxd', { cache: 'no-store' });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (!cancel) setItems(data.items || []);
      } catch (e) {
        if (!cancel) setError(e.message ?? 'Failed to load');
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  if (error) return <div>Couldn’t load Letterboxd: {error}</div>;
  console.log(items);
  if (!items.length) return <div>No recent watches yet.</div>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {items.map(movie => (
        <div
          key={movie.link}
          className='bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow'
        >
          <a
            href={movie.link}
            target='_blank'
            rel='noreferrer'
            className='block'
          >
            {movie.posterUrl && (
              <div className='relative aspect-[2/3]'>
                <Image
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                />
                {movie.rewatch && (
                  <span className='absolute top-2 right-2 bg-primary/80 text-primary-foreground px-2 py-1 rounded text-sm'>
                    Rewatch
                  </span>
                )}
              </div>
            )}
            <div className='p-4'>
              <h3 className='font-semibold text-lg mb-1'>
                {movie.title}{' '}
                <span className='text-muted-foreground'>({movie.year})</span>
              </h3>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < movie.rating
                          ? 'text-yellow-500'
                          : 'text-muted-foreground'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <time className='text-sm text-muted-foreground'>
                  {new Date(movie.date).toLocaleDateString()}
                </time>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
