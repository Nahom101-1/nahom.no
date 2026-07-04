'use client';
import { motion } from 'motion/react';
import type { SiteSettings } from '@/types/sanity';
import { rv, rvViewport } from '@/lib/motion';

const reveal = rv;

const DEFAULT_HIGHLIGHTS = [
  { label: 'Now', value: 'Skatteetaten IT' },
  { label: 'Prev', value: 'NAV IT' },
  { label: 'Stack', value: 'Kotlin · Go · TS' },
];

export default function HeroSection({ settings }: { settings: SiteSettings | null }) {
  const tagline =
    settings?.tagline ??
    'Backend and AI-leaning developer. I build APIs, data models and reliable services.';

  const [firstName, ...rest] = (settings?.name ?? 'Nahom Berhane').split(' ');
  const lastName = rest.join(' ');
  const year = new Date().getFullYear();
  const highlights =
    settings?.heroHighlights && settings.heroHighlights.length > 0
      ? settings.heroHighlights
      : DEFAULT_HIGHLIGHTS;

  return (
    <header
      id='top'
      className='page-wrap section-border'
      style={{ paddingTop: '160px', paddingBottom: '70px' }}
    >
      <div
        className='flex justify-between flex-wrap gap-3 font-mono uppercase mb-9'
        style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'var(--ds-fg-muted)' }}
      >
        <span>{settings?.roleLabel ?? 'Programmer · Developer'}</span>
        <span>Portfolio — Index {year}</span>
        <span>{settings?.location ?? 'Oslo, Norway'}</span>
      </div>

      <motion.h1
        variants={reveal}
        initial='hidden'
        animate='visible'
        viewport={rvViewport}
        className='font-display font-extrabold uppercase'
        style={{
          fontSize: 'clamp(74px, 18.5vw, 300px)',
          lineHeight: '0.84',
          letterSpacing: '-0.035em',
        }}
      >
        {firstName}
        {lastName ? (
          <>
            <br />
            <span style={{ color: 'var(--ds-accent)' }}>{lastName}</span>
          </>
        ) : null}
      </motion.h1>

      <div className='grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-10 items-end mt-11'>
        <motion.p
          variants={reveal}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.1 }}
          className='font-serif'
          style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: '1.3', maxWidth: '24ch' }}
        >
          {tagline}
        </motion.p>

        <motion.div
          variants={reveal}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.2 }}
          className='font-mono uppercase text-left sm:text-right'
          style={{ fontSize: '11px', letterSpacing: '0.08em', lineHeight: '2.2', color: 'var(--ds-fg-muted)' }}
        >
          {highlights.map((h, i) => (
            <span key={i}>
              {h.label} →{' '}
              <strong style={{ color: 'var(--ds-fg)', fontWeight: 500 }}>{h.value}</strong>
              {i < highlights.length - 1 ? <br /> : null}
            </span>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
