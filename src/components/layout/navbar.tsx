'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ resumeUrl }: { resumeUrl?: string }) {
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

        <ThemeToggle />

        {resumeUrl ? (
          <a
            href={resumeUrl}
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
            Résumé ↓
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
            Say hello
          </a>
        )}
      </div>
    </nav>
  );
}
