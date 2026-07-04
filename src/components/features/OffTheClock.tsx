'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { rv } from '@/lib/motion';
import type { LetterboxdFeed } from '@/types/letterBoxItem';
import { useLang } from '@/lib/i18n';

type NowPlaying = {
  playing: boolean;
  artist?: string;
  track?: string;
  album?: string;
  albumArt?: string;
  url?: string | null;
};

function Equalizer() {
  return (
    <div className='flex items-end gap-[3px] h-4' aria-hidden='true'>
      {[0, 1, 2, 3].map(i => (
        <motion.span
          key={i}
          className='w-[3px]'
          style={{ background: 'var(--ds-accent)' }}
          animate={{ height: ['30%', '100%', '45%', '85%', '30%'] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

function NowPlayingCard() {
  const { ui } = useLang();
  const [data, setData] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/now-playing', { cache: 'no-store' });
        const json = (await res.json()) as NowPlaying;
        if (active) setData(json);
      } catch {
        if (active) setData({ playing: false });
      }
    };
    load();
    const id = setInterval(load, 30000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const playing = data?.playing && data.track;

  return (
    <div
      className='border h-full flex flex-col justify-between'
      style={{
        borderColor: 'var(--ds-border)',
        padding: '24px',
        minHeight: '240px',
      }}
    >
      <div
        className='flex items-center justify-between font-mono uppercase'
        style={{
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: 'var(--ds-fg-muted)',
        }}
      >
        <span>{ui.nowPlaying}</span>
        {playing ? (
          <Equalizer />
        ) : (
          <span style={{ color: 'var(--ds-fg-subtle)' }}>Spotify</span>
        )}
      </div>

      {playing ? (
        <a
          href={data?.url ?? undefined}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-4 group'
        >
          {data?.albumArt ? (
            <div
              className='relative flex-none overflow-hidden'
              style={{ width: '76px', height: '76px', borderRadius: '2px' }}
            >
              <Image
                src={data.albumArt}
                alt={data.album ?? 'Album art'}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                sizes='76px'
              />
            </div>
          ) : null}
          <div className='min-w-0'>
            <div
              className='font-display font-bold truncate'
              style={{ fontSize: '22px', letterSpacing: '-0.02em' }}
            >
              {data?.track}
            </div>
            <div
              className='font-mono uppercase mt-1 truncate'
              style={{
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: 'var(--ds-fg-muted)',
              }}
            >
              {data?.artist}
            </div>
          </div>
        </a>
      ) : (
        <div>
          <div
            className='font-display font-bold'
            style={{
              fontSize: '22px',
              letterSpacing: '-0.02em',
              color: 'var(--ds-fg-muted)',
            }}
          >
            {ui.nothingPlaying}
          </div>
          <div
            className='font-serif mt-1'
            style={{ fontSize: '15px', color: 'var(--ds-fg-muted)' }}
          >
            {ui.nothingPlayingSub}
          </div>
        </div>
      )}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span
      className='font-mono'
      style={{ fontSize: '11px', color: 'var(--ds-accent)' }}
    >
      {'★'.repeat(full)}
      {half ? '½' : ''}
    </span>
  );
}

function RecentlyWatched() {
  const { ui } = useLang();
  const [movies, setMovies] = useState<LetterboxdFeed[] | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/letterboxd', { cache: 'no-store' })
      .then(res => res.json())
      .then((json: { LatestWatchedMovies?: LetterboxdFeed[] }) => {
        if (active) setMovies(json.LatestWatchedMovies ?? []);
      })
      .catch(() => {
        if (active) setMovies([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const items = (movies ?? []).slice(0, 6);

  return (
    <div>
      <div
        className='flex items-center justify-between font-mono uppercase mb-5'
        style={{
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: 'var(--ds-fg-muted)',
        }}
      >
        <span>{ui.recentlyWatched}</span>
        <span style={{ color: 'var(--ds-fg-subtle)' }}>Letterboxd</span>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-6 gap-3'>
        {(movies === null ? Array.from({ length: 6 }) : items).map(
          (movie, i) => {
            const m = movie as LetterboxdFeed | undefined;
            return (
              <a
                key={m?.guid ?? i}
                href={m?.link ?? undefined}
                target='_blank'
                rel='noopener noreferrer'
                className='group block'
              >
                <div
                  className='relative w-full overflow-hidden border'
                  style={{
                    aspectRatio: '2 / 3',
                    borderColor: 'var(--ds-border)',
                    background: 'var(--ds-bg-surface)',
                  }}
                >
                  {m?.posterURL ? (
                    <Image
                      src={m.posterURL}
                      alt={m.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                      sizes='(max-width: 640px) 33vw, 120px'
                    />
                  ) : null}
                </div>
                {m ? (
                  <div className='mt-2'>
                    <div
                      className='font-mono uppercase truncate'
                      style={{ fontSize: '10px', letterSpacing: '0.06em' }}
                    >
                      {m.title}
                    </div>
                    <div className='flex items-center justify-between mt-0.5'>
                      <span
                        className='font-mono'
                        style={{
                          fontSize: '10px',
                          color: 'var(--ds-fg-muted)',
                        }}
                      >
                        {m.year}
                      </span>
                      {m.rating ? <Stars rating={m.rating} /> : null}
                    </div>
                  </div>
                ) : null}
              </a>
            );
          }
        )}
      </div>
    </div>
  );
}

export default function OffTheClock({
  kicker,
  kickerNo,
}: {
  kicker?: string;
  kickerNo?: string;
}) {
  const { ui, pick } = useLang();
  return (
    <section
      id='off-the-clock'
      className='page-wrap section-border'
      style={{ paddingTop: '110px', paddingBottom: '110px' }}
    >
      <motion.div
        variants={rv}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-7% 0px' }}
        className='grid items-baseline gap-4 mb-14'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <span
          className='font-mono text-[13px]'
          style={{ color: 'var(--ds-accent)' }}
        >
          06 /
        </span>
        <div>
          <h2
            className='font-display font-extrabold uppercase'
            style={{
              fontSize: 'clamp(34px, 6vw, 76px)',
              letterSpacing: '-0.03em',
              lineHeight: '0.9',
            }}
          >
            {ui.offTitle}
          </h2>
          <p
            className='font-mono uppercase mt-1'
            style={{
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--ds-fg-muted)',
            }}
          >
            {pick(kicker, kickerNo) ?? ui.offSub}
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={rv}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-7% 0px' }}
        className='grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 items-start'
      >
        <NowPlayingCard />
        <RecentlyWatched />
      </motion.div>
    </section>
  );
}
