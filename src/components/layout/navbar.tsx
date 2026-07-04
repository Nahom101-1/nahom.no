'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLang } from '@/lib/i18n';

export function Navbar({ resumeUrl, resumeNoUrl }: { resumeUrl?: string; resumeNoUrl?: string }) {
  const { lang, ui } = useLang();

  const navLinks = [
    { label: ui.navWork, href: '#work' },
    { label: ui.navExperience, href: '#experience' },
    { label: ui.navAbout, href: '#about' },
    { label: ui.navContact, href: '#contact' },
  ];

  const cvUrl = lang === 'no' ? (resumeNoUrl ?? resumeUrl) : resumeUrl;

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 navbar-glass'>
      <div className='page-wrap flex items-center justify-between py-4'>
        <Link
          href='#top'
          className='flex items-center gap-2.5 font-display font-extrabold text-[16px] tracking-tight'
          style={{ letterSpacing: '-0.02em' }}
        >
          <span
            className='inline-block w-3 h-3 flex-none'
            style={{ background: 'var(--ds-accent)' }}
          />
          Nahom Berhane
        </Link>

        <div
          className='hidden md:flex items-center gap-7 font-mono text-[11px] uppercase'
          style={{ letterSpacing: '0.12em', color: 'var(--ds-fg-muted)' }}
        >
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className='transition-colors duration-200 hover:text-foreground'
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <LanguageToggle />
            <span
              className='w-px h-4 flex-none'
              style={{ background: 'var(--ds-border-strong)' }}
              aria-hidden='true'
            />
            <ThemeToggle />
          </div>

          {cvUrl ? (
            <a
              href={cvUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='font-mono text-[11px] uppercase px-4 py-2 transition-colors duration-200 hover:bg-accent hover:text-[var(--ds-accent-fg)]'
              style={{
                letterSpacing: '0.10em',
                background: 'var(--ds-fg)',
                color: 'var(--ds-bg)',
                borderRadius: '2px',
              }}
            >
              {ui.resumeLabel}
            </a>
          ) : (
            <a
              href='#contact'
              className='font-mono text-[11px] uppercase px-4 py-2 transition-colors duration-200'
              style={{
                letterSpacing: '0.10em',
                background: 'var(--ds-fg)',
                color: 'var(--ds-bg)',
                borderRadius: '2px',
              }}
            >
              {ui.sayHello}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
