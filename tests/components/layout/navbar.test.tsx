import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { Navbar } from '@/components/layout/navbar';

const settings = {
  name: 'Nahom Berhane',
  navWork: 'Work',
  navWorkNo: 'Arbeid',
  navExperience: 'Experience',
  navExperienceNo: 'Erfaring',
  navAbout: 'About',
  navAboutNo: 'Om meg',
  navContact: 'Contact',
  navContactNo: 'Kontakt',
  resumeNavLabel: 'Résumé ↓',
  resumeNavLabelNo: 'CV ↓',
};

describe('Navbar', () => {
  it('renders cms nav labels and resume link', () => {
    render(
      <LanguageProvider>
        <Navbar settings={settings} resumeUrl='https://example.com/cv.pdf' />
      </LanguageProvider>
    );

    expect(screen.getByText('Nahom Berhane')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'href',
      '#work'
    );
    expect(screen.getByRole('link', { name: 'Résumé ↓' })).toHaveAttribute(
      'href',
      'https://example.com/cv.pdf'
    );
  });
});
