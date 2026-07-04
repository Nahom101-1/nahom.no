'use client';
import { motion } from 'motion/react';
import type { SiteSettings } from '@/types/sanity';
import { rv, rvViewport } from '@/lib/motion';
import { useLang } from '@/lib/i18n';
import { label } from '@/lib/cms';

const reveal = rv;

export default function HeroSection({ settings }: { settings: SiteSettings | null }) {
  const { lang, pick } = useLang();
  const tagline = pick(settings?.tagline, settings?.taglineNo);
  const roleLabel = pick(settings?.roleLabel, settings?.roleLabelNo);
  const portfolioIndex = label(settings, lang, 'portfolioIndex', 'portfolioIndexNo');
  const highlights = settings?.heroHighlights ?? [];

  const name = settings?.name ?? '';
  const [firstName, ...rest] = name.split(' ').filter(Boolean);
  const lastName = rest.join(' ');
  const year = new Date().getFullYear();

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
        {roleLabel ? <span>{roleLabel}</span> : <span />}
        {portfolioIndex ? (
          <span>
            {portfolioIndex} {year}
          </span>
        ) : null}
      </div>

      {name ? (
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
      ) : null}

      <div className='grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-10 items-end mt-11'>
        {tagline ? (
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
        ) : (
          <div />
        )}

        {highlights.length > 0 ? (
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
                {pick(h.label, h.labelNo) ?? h.label} →{' '}
                <strong style={{ color: 'var(--ds-fg)', fontWeight: 500 }}>{h.value}</strong>
                {i < highlights.length - 1 ? <br /> : null}
              </span>
            ))}
          </motion.div>
        ) : null}
      </div>
    </header>
  );
}
