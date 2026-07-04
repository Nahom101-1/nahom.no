'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import type { SiteSettings } from '@/types/sanity';
import { useLang } from '@/lib/i18n';
import { label } from '@/lib/cms';

export default function ToolkitSection({ settings }: { settings: SiteSettings | null }) {
  const { lang, pick } = useLang();
  const groups = settings?.skillGroups ?? [];
  const title = pick(settings?.toolkitHeading, settings?.toolkitHeadingNo);
  const subtitle = pick(settings?.toolkitSubtitle, settings?.toolkitSubtitleNo);

  if (groups.length === 0) return null;

  return (
    <section
      id='skills'
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
          04 /
        </span>
        <div>
          {title ? (
            <h2
              className='font-display font-extrabold uppercase'
              style={{ fontSize: 'clamp(34px, 6vw, 76px)', letterSpacing: '-0.03em', lineHeight: '0.9' }}
            >
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className='font-mono uppercase mt-1' style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--ds-fg-muted)' }}>
              {subtitle}
            </p>
          ) : null}
        </div>
      </motion.div>

      <div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border'
        style={{ gap: '1px', background: 'var(--ds-border)', borderColor: 'var(--ds-border)' }}
      >
        {groups.map((group, i) => (
          <motion.div
            key={group.category}
            variants={rv}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-7% 0px' }}
            transition={{ delay: i * 0.05 }}
            className='p-7'
            style={{ background: 'var(--ds-bg)' }}
          >
            <h4
              className='font-mono uppercase mb-5'
              style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ds-accent)' }}
            >
              {pick(group.category, group.categoryNo) ?? group.category}
            </h4>
            <ul className='flex flex-col gap-2.5'>
              {group.skills.map(skill => (
                <li
                  key={skill}
                  className='font-display font-medium flex items-center gap-2.5'
                  style={{ fontSize: '19px', letterSpacing: '-0.01em' }}
                >
                  <span
                    className='inline-block flex-none'
                    style={{ width: '6px', height: '6px', background: 'var(--ds-accent)' }}
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
