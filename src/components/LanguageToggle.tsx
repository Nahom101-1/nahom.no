'use client';

import { Globe } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const next = lang === 'en' ? 'no' : 'en';

  return (
    <button
      type='button'
      onClick={() => setLang(next)}
      aria-label={lang === 'en' ? 'Bytt til norsk' : 'Switch to English'}
      className='inline-flex items-center gap-1.5 h-8 px-2.5 border font-mono text-[10px] uppercase transition-colors duration-200 cursor-pointer hover:border-[var(--ds-fg)] hover:text-foreground'
      style={{
        letterSpacing: '0.10em',
        color: 'var(--ds-fg-muted)',
        borderColor: 'var(--ds-border-strong)',
        borderRadius: '2px',
        background: 'transparent',
      }}
    >
      <Globe size={14} strokeWidth={1.75} aria-hidden='true' />
      <span>{next.toUpperCase()}</span>
    </button>
  );
}
