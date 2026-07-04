'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import type { SiteSettings } from '@/types/sanity';


export default function ContactSection({
  settings,
  resumeUrl,
  resumeNoUrl,
  resumeNoLabel,
}: {
  settings: SiteSettings | null;
  resumeUrl?: string;
  resumeNoUrl?: string;
  resumeNoLabel?: string;
}) {
  const email = settings?.email ?? 'hello@nahom.no';
  const github = settings?.githubUrl ?? 'https://github.com/Nahom101-1';
  const linkedin = settings?.linkedinUrl ?? 'https://www.linkedin.com/in/nahom-berhane-19ab84233/';
  const website = settings?.websiteUrl ?? 'https://nahom.no';
  const kicker = settings?.contactKicker ?? 'Open to graduate roles & collaborations';
  const heading = settings?.contactHeading ?? 'Say hello';

  const websiteLabel = website.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const links = [
    { label: 'Email me', href: `mailto:${email}`, primary: true },
    { label: 'GitHub', href: github },
    { label: 'LinkedIn', href: linkedin },
    { label: websiteLabel, href: website },
    ...(resumeUrl ? [{ label: 'Résumé ↓', href: resumeUrl, download: true }] : []),
    ...(resumeNoUrl
      ? [{ label: `${resumeNoLabel ?? 'CV (norsk)'} ↓`, href: resumeNoUrl, download: true }]
      : []),
  ];

  return (
    <section
      id='contact'
      className='page-wrap text-center'
      style={{ paddingTop: '130px', paddingBottom: '90px' }}
    >
      <motion.p
        variants={rv}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-7% 0px' }}
        className='font-mono uppercase mb-7'
        style={{ fontSize: '11px', letterSpacing: '0.26em', color: 'var(--ds-fg-muted)' }}
      >
        {kicker}
      </motion.p>

      <motion.div
        variants={rv}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-7% 0px' }}
        transition={{ delay: 0.1 }}
        className='font-display font-extrabold uppercase'
        style={{ fontSize: 'clamp(54px, 13vw, 200px)', letterSpacing: '-0.04em', lineHeight: '0.84' }}
      >
        <a
          href={`mailto:${email}`}
          className='transition-colors duration-300 hover:text-accent'
        >
          {heading.replace(/ /g, ' ')}
        </a>
      </motion.div>

      <motion.div
        variants={rv}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-7% 0px' }}
        transition={{ delay: 0.2 }}
        className='flex gap-3 justify-center flex-wrap mt-14'
      >
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            {...(link.download ? { download: true } : {})}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className='font-mono uppercase transition-all duration-250'
            style={{
              fontSize: '12px',
              letterSpacing: '0.08em',
              padding: '14px 22px',
              borderRadius: '2px',
              border: link.primary
                ? '1px solid var(--ds-accent)'
                : '1px solid var(--ds-fg)',
              background: link.primary ? 'var(--ds-accent)' : 'transparent',
              color: link.primary ? 'var(--ds-accent-fg)' : 'var(--ds-fg)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'var(--ds-fg)';
              el.style.color = 'var(--ds-bg)';
              el.style.borderColor = 'var(--ds-fg)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (link.primary) {
                el.style.background = 'var(--ds-accent)';
                el.style.color = 'var(--ds-accent-fg)';
                el.style.borderColor = 'var(--ds-accent)';
              } else {
                el.style.background = 'transparent';
                el.style.color = 'var(--ds-fg)';
                el.style.borderColor = 'var(--ds-fg)';
              }
            }}
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
