export default function FooterSection({
  name,
  note,
  phone,
  location,
}: {
  name?: string;
  note?: string;
  phone?: string;
  location?: string;
}) {
  const year = new Date().getFullYear();
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
        <span>
          {(location ?? 'Gjøvik').split(',')[0]}
          {phone ? ` · ${phone}` : ''}
        </span>
      </div>
    </footer>
  );
}
