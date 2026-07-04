'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import { ageFrom } from '@/lib/utils';
import Image from 'next/image';
import type { SiteSettings } from '@/types/sanity';

const DEFAULT_LANGUAGES = ['Norwegian', 'English', 'Amharic', 'Tigrinya'];

const DEFAULT_PARAGRAPHS = [
  'I recently finished a bachelor’s in programming at NTNU Gjøvik. I care most about the practical parts of software: APIs, data models and services that have to stay up.',
  'Lately that has meant putting language models into real systems. This summer I’m at Skatteetaten IT, where I’m prototyping an AI tool for troubleshooting their Kubernetes platform.',
  'Before that I built backend services at NAV, and since 2024 I’ve maintained a student organisation’s site and infrastructure on the side.',
];


export default function AboutSection({ settings }: { settings: SiteSettings | null }) {
  const paragraphs =
    settings?.aboutText && settings.aboutText.length > 0
      ? settings.aboutText
      : DEFAULT_PARAGRAPHS;

  const languages =
    settings?.languages && settings.languages.length > 0
      ? settings.languages.map(l => l.name)
      : DEFAULT_LANGUAGES;

  const name = settings?.name ?? 'Nahom Berhane';
  const age = ageFrom(settings?.birthDate);
  const place = (settings?.location ?? 'Gjøvik').split(',')[0];
  const caption = age ? `${place} · ${age}` : `${place} · ${new Date().getFullYear()}`;

  return (
    <section
      id='about'
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
        <span className='font-mono text-[13px]' style={{ color: 'var(--ds-accent)' }}>
          01 /
        </span>
        <div>
          <h2
            className='font-display font-extrabold uppercase'
            style={{ fontSize: 'clamp(34px, 6vw, 76px)', letterSpacing: '-0.03em', lineHeight: '0.9' }}
          >
            About
          </h2>
          <p className='font-mono uppercase mt-1' style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--ds-fg-muted)' }}>
            A short introduction
          </p>
        </div>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-16 items-start'>
        <motion.div
          variants={rv}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-7% 0px' }}
        >
          {settings?.portraitUrl ? (
            <div className='relative w-full border' style={{ height: '480px', borderColor: 'var(--ds-border)' }}>
              <Image
                src={settings.portraitUrl}
                alt={name}
                fill
                className='object-cover object-top'
                sizes='(max-width: 768px) 100vw, 45vw'
              />
            </div>
          ) : (
            <div
              className='w-full border overflow-hidden relative'
              style={{ height: '480px', borderColor: 'var(--ds-border)' }}
            >
              {/* Base */}
              <div className='absolute inset-0' style={{ background: 'var(--ds-bg-surface)' }} />
              {/* Shimmer sweep */}
              <div className='absolute inset-0 portrait-shimmer' />
              {/* Silhouette hint — subtle head + shoulders shape */}
              <svg
                className='absolute inset-0 w-full h-full'
                viewBox='0 0 400 480'
                preserveAspectRatio='xMidYMid slice'
                aria-hidden='true'
              >
                <ellipse cx='200' cy='168' rx='68' ry='76' fill='var(--ds-border-strong)' />
                <path
                  d='M68,480 Q68,330 200,318 Q332,330 332,480 Z'
                  fill='var(--ds-border-strong)'
                />
              </svg>
            </div>
          )}
          <div
            className='flex justify-between mt-3 font-mono uppercase'
            style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'var(--ds-fg-muted)' }}
          >
            <span>{name}</span>
            <span>{caption}</span>
          </div>
        </motion.div>

        <div>
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={rv}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-7% 0px' }}
              transition={{ delay: i * 0.08 }}
              className='font-serif mb-5'
              style={{ fontSize: 'clamp(19px, 2vw, 24px)', lineHeight: '1.5' }}
            >
              {p}
            </motion.p>
          ))}

          <motion.div
            variants={rv}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-7% 0px' }}
            className='flex flex-wrap gap-2 mt-2'
          >
            {languages.map(lang => (
              <span
                key={lang}
                className='font-mono uppercase border rounded-full'
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  padding: '6px 13px',
                  borderColor: 'var(--ds-fg)',
                }}
              >
                {lang}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
