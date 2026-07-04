import type { Metadata } from 'next';
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nahom Berhane',
    template: '%s — Nahom Berhane',
  },
  description:
    'Backend & AI-leaning developer building the quiet infrastructure behind useful software. Portfolio of projects, work experience, and education.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Nahom Berhane',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className='antialiased'>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
