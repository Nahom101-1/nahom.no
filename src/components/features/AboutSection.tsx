'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import { ageFrom } from '@/lib/utils';
import Image from 'next/image';
import type { SiteSettings } from '@/types/sanity';
import { useLang, LANGUAGE_NAMES_NO } from '@/lib/i18n';
import { label } from '@/lib/cms';

export default function AboutSection({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const { lang, pickList, tr } = useLang();

  const paragraphs = pickList(settings?.aboutText, settings?.aboutTextNo) ?? [];
  const languages = settings?.languages ?? [];
  const name = settings?.name;
  const age = ageFrom(settings?.birthDate);
  const caption = age ? String(age) : undefined;
  const title = label(settings, lang, 'aboutHeading', 'aboutHeadingNo');
  const subtitle = label(
    settings,
    lang,
    'aboutSubheading',
    'aboutSubheadingNo'
  );

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
        <span
          className='font-mono text-[13px]'
          style={{ color: 'var(--ds-accent)' }}
        >
          01 /
        </span>
        <div>
          {title ? (
            <h2
              className='font-display font-extrabold uppercase'
              style={{
                fontSize: 'clamp(34px, 6vw, 76px)',
                letterSpacing: '-0.03em',
                lineHeight: '0.9',
              }}
            >
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p
              className='font-mono uppercase mt-1'
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: 'var(--ds-fg-muted)',
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-16 items-start'>
        <motion.div
          variants={rv}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-7% 0px' }}
          className='max-w-[240px]'
        >
          {settings?.portraitUrl ? (
            <div
              className='relative w-full border'
              style={{ height: '300px', borderColor: 'var(--ds-border)' }}
            >
              <Image
                src={settings.portraitUrl}
                alt={name ?? 'Portrait'}
                fill
                className='object-cover object-top'
                sizes='240px'
              />
            </div>
          ) : (
            <div
              className='w-full border overflow-hidden relative'
              style={{ height: '300px', borderColor: 'var(--ds-border)' }}
            >
              <div
                className='absolute inset-0'
                style={{ background: 'var(--ds-bg-surface)' }}
              />
              <div className='absolute inset-0 portrait-shimmer' />
              <svg
                className='absolute inset-0 w-full h-full'
                viewBox='0 0 240 300'
                preserveAspectRatio='xMidYMid slice'
                aria-hidden='true'
              >
                <ellipse
                  cx='120'
                  cy='105'
                  rx='42'
                  ry='48'
                  fill='var(--ds-border-strong)'
                />
                <path
                  d='M40,300 Q40,206 120,198 Q200,206 200,300 Z'
                  fill='var(--ds-border-strong)'
                />
              </svg>
            </div>
          )}
          {(name || caption) && (
            <div
              className='flex justify-between mt-3 font-mono uppercase'
              style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--ds-fg-muted)',
              }}
            >
              <span>{name}</span>
              <span>{caption}</span>
            </div>
          )}
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

          {languages.length > 0 && (
            <motion.div
              variants={rv}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-7% 0px' }}
              className='flex flex-wrap gap-2 mt-2'
            >
              {languages.map(item => (
                <span
                  key={item.name}
                  className='font-mono uppercase border rounded-full'
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    padding: '6px 13px',
                    borderColor: 'var(--ds-fg)',
                  }}
                >
                  {tr(LANGUAGE_NAMES_NO, item.name)}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
