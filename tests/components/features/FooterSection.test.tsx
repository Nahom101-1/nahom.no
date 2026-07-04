import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FooterSection from '@/components/features/FooterSection';

describe('FooterSection', () => {
  it('renders name, note, and email from settings', () => {
    render(
      <FooterSection
        settings={{
          name: 'Nahom Berhane',
          footerNote: 'nahom.no',
          email: 'nahom@berhane.no',
        }}
      />
    );

    expect(screen.getByText(/Nahom Berhane ©/)).toBeInTheDocument();
    expect(screen.getByText('nahom.no')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'nahom@berhane.no' })
    ).toHaveAttribute('href', 'mailto:nahom@berhane.no');
  });
});
