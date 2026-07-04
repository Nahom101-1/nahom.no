'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import type { SiteSettings, WorkExperience } from '@/types/sanity';
import { useLang } from '@/lib/i18n';
import { label } from '@/lib/cms';
import { formatExperienceYear } from '@/lib/utils';

export default function ExperienceSection({
  experience,
  settings,
}: {
  experience: WorkExperience[];
  settings: SiteSettings | null;
}) {
  const { lang, pick } = useLang();
  const title = label(
    settings,
    lang,
    'experienceHeading',
    'experienceHeadingNo'
  );
  const subtitle = label(
    settings,
    lang,
    'experienceSubheading',
    'experienceSubheadingNo'
  );

  if (experience.length === 0) return null;

  return (
    <section
      id='experience'
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
          03 /
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

      <div className='hairline-top'>
        {experience.map((job, i) => (
          <motion.div
            key={job._id}
            variants={rv}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-7% 0px' }}
            transition={{ delay: i * 0.06 }}
            className='grid grid-cols-1 md:grid-cols-[90px_1.1fr_1.4fr_auto] gap-7 items-baseline py-7 section-border transition-all duration-300 md:hover:px-5'
            style={{ borderBottom: '1px solid var(--ds-border)' }}
          >
            <span
              className='font-mono text-[13px]'
              style={{ color: 'var(--ds-accent)', letterSpacing: '0.06em' }}
            >
              {formatExperienceYear(job.startDate, job.endDate, job.isCurrent)}
            </span>

            <span>
              <span
                className='font-display font-bold block'
                style={{
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.05',
                }}
              >
                {pick(job.position, job.positionNo)}
              </span>
              <span
                className='font-mono uppercase mt-1.5 block'
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'var(--ds-fg-muted)',
                }}
              >
                {job.company}
                {job.location ? ` · ${job.location}` : ''}
              </span>
            </span>

            {pick(job.description, job.descriptionNo) ? (
              <span
                className='font-serif'
                style={{
                  fontSize: '16px',
                  lineHeight: '1.55',
                  color: '#3c3a32',
                }}
              >
                {pick(job.description, job.descriptionNo)}
              </span>
            ) : (
              <span />
            )}

            {job.badge ? (
              <span
                className='font-mono uppercase rounded-full h-fit self-start'
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  color: 'var(--ds-accent)',
                  border: '1px solid var(--ds-accent)',
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {job.badge}
              </span>
            ) : (
              <span />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
