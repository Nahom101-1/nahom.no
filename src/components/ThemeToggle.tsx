'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — render only after mount
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className='w-8 h-4' />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='flex items-center gap-1.5 font-mono text-[11px] uppercase transition-colors duration-200 hover:opacity-70'
      style={{ letterSpacing: '0.10em', color: 'var(--ds-fg-muted)' }}
    >
      {/* Track */}
      <span
        className='relative inline-flex items-center w-8 h-4 rounded-full transition-colors duration-300'
        style={{ background: isDark ? 'var(--ds-accent)' : 'var(--ds-border-strong)' }}
      >
        {/* Thumb */}
        <span
          className='absolute inline-block w-3 h-3 rounded-full transition-transform duration-300'
          style={{
            background: 'var(--ds-bg)',
            transform: isDark ? 'translateX(18px)' : 'translateX(2px)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </span>
    </button>
  );
}
