'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import type { SiteSettings } from '@/types/sanity';
import { useLang } from '@/lib/i18n';
import { label } from '@/lib/cms';

export default function ContactSection({
  settings,
  resumeUrl,
  resumeNoUrl,
}: {
  settings: SiteSettings | null;
  resumeUrl?: string;
  resumeNoUrl?: string;
}) {
  const { lang, pick } = useLang();

  const email = settings?.email;
  const github = settings?.githubUrl;
  const linkedin = settings?.linkedinUrl;
  const website = settings?.websiteUrl;
  const kicker = pick(settings?.contactKicker, settings?.contactKickerNo);
  const heading = pick(settings?.contactHeading, settings?.contactHeadingNo);
  const emailMe = label(settings, lang, 'emailMeLabel', 'emailMeLabelNo');
  const resumeEn = label(settings, lang, 'resumeEnLabel', 'resumeEnLabelNo');
  const resumeNo = label(settings, lang, 'resumeNoLabel', 'resumeNoLabelNo');

  if (!email && !heading) return null;

  const websiteLabel = website?.replace(/^https?:\/\//, '').replace(/\/$/, '');

  type ContactLink = {
    label: string;
    href: string;
    primary?: boolean;
    download?: boolean;
  };

  const resumeLinks: ContactLink[] = [
    ...(resumeUrl && resumeEn
      ? [{ label: resumeEn, href: resumeUrl, download: true }]
      : []),
    ...(resumeNoUrl && resumeNo
      ? [{ label: resumeNo, href: resumeNoUrl, download: true }]
      : []),
  ];
  if (lang === 'no') resumeLinks.reverse();

  const links: ContactLink[] = [
    ...(email && emailMe
      ? [{ label: emailMe, href: `mailto:${email}`, primary: true }]
      : []),
    ...(github ? [{ label: 'GitHub', href: github }] : []),
    ...(linkedin ? [{ label: 'LinkedIn', href: linkedin }] : []),
    ...(website && websiteLabel
      ? [{ label: websiteLabel, href: website }]
      : []),
    ...resumeLinks,
  ];

  return (
    <section
      id='contact'
      className='page-wrap text-center'
      style={{ paddingTop: '130px', paddingBottom: '90px' }}
    >
      {kicker ? (
        <motion.p
          variants={rv}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-7% 0px' }}
          className='font-mono uppercase mb-7'
          style={{
            fontSize: '11px',
            letterSpacing: '0.26em',
            color: 'var(--ds-fg-muted)',
          }}
        >
          {kicker}
        </motion.p>
      ) : null}

      {heading && email ? (
        <motion.div
          variants={rv}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-7% 0px' }}
          transition={{ delay: 0.1 }}
          className='font-display font-extrabold uppercase'
          style={{
            fontSize: 'clamp(54px, 13vw, 200px)',
            letterSpacing: '-0.04em',
            lineHeight: '0.84',
          }}
        >
          <a
            href={`mailto:${email}`}
            className='transition-colors duration-300 hover:text-accent'
          >
            {heading.replace(/ /g, '\u00A0')}
          </a>
        </motion.div>
      ) : null}

      {links.length > 0 && (
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
              rel={
                link.href.startsWith('mailto')
                  ? undefined
                  : 'noopener noreferrer'
              }
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
      )}
    </section>
  );
}
