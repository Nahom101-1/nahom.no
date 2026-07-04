import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '@/lib/i18n';
import { LanguageToggle } from '@/components/LanguageToggle';

describe('LanguageToggle', () => {
  it('shows target language and toggles on click', async () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>
    );

    const button = screen.getByRole('button', { name: 'Bytt til norsk' });
    expect(button).toHaveTextContent('NO');

    await userEvent.click(button);
    expect(
      screen.getByRole('button', { name: 'Switch to English' })
    ).toHaveTextContent('EN');
    expect(window.localStorage.getItem('lang')).toBe('no');
  });
});
