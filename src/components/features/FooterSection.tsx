'use client';

export default function FooterSection({
  name,
  note,
  email,
}: {
  name?: string;
  note?: string;
  email?: string;
}) {
  const year = new Date().getFullYear();
  const address = email ?? 'nahom@berhane.no';

  return (
    <footer style={{ background: 'var(--ds-fg)', color: 'var(--ds-bg)', padding: '30px 0' }}>
      <div
        className='page-wrap flex justify-between flex-wrap gap-3 font-mono uppercase'
        style={{ fontSize: '10px', letterSpacing: '0.12em' }}
      >
        <span>
          {name ?? 'Nahom Berhane'} © {year}
        </span>
        <span>{note ?? 'nahom.no'}</span>
        <a href={`mailto:${address}`} className='transition-opacity duration-200 hover:opacity-70'>
          {address}
        </a>
      </div>
    </footer>
  );
}
