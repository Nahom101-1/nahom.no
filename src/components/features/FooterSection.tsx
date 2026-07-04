'use client';
import type { SiteSettings } from '@/types/sanity';

export default function FooterSection({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const year = new Date().getFullYear();
  const name = settings?.name;
  const note = settings?.footerNote;
  const email = settings?.email;

  return (
    <footer
      style={{
        background: 'var(--ds-fg)',
        color: 'var(--ds-bg)',
        padding: '30px 0',
      }}
    >
      <div
        className='page-wrap flex justify-between flex-wrap gap-3 font-mono uppercase'
        style={{ fontSize: '10px', letterSpacing: '0.12em' }}
      >
        {name ? (
          <span>
            {name} © {year}
          </span>
        ) : (
          <span />
        )}
        {note ? <span>{note}</span> : <span />}
        {email ? (
          <a
            href={`mailto:${email}`}
            className='transition-opacity duration-200 hover:opacity-70'
          >
            {email}
          </a>
        ) : (
          <span />
        )}
      </div>
    </footer>
  );
}
