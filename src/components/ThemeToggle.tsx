'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className='w-8 h-8 flex-none' aria-hidden='true' />;

  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-200 cursor-pointer hover:border-[var(--ds-accent)] hover:text-[var(--ds-accent)]'
      style={{
        color: 'var(--ds-fg-muted)',
        borderColor: 'var(--ds-border-strong)',
        background: isDark ? 'var(--ds-bg-surface)' : 'var(--ds-bg-elevated)',
      }}
    >
      {isDark ? (
        <Sun size={15} strokeWidth={1.75} aria-hidden='true' />
      ) : (
        <Moon size={15} strokeWidth={1.75} aria-hidden='true' />
      )}
    </button>
  );
}
