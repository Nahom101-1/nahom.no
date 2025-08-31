import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nahom Personal website',
  description: 'Nahom personal website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='font-didot antialiased'>{children}</body>
    </html>
  );
}
