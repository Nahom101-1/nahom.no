export default function MarqueeStrip({ words }: { words?: string[] }) {
  if (!words || words.length === 0) return null;

  const track = [...words, ...words];

  return (
    <div
      className='overflow-hidden py-4 section-border'
      style={{ background: 'var(--ds-fg)' }}
    >
      <div className='flex gap-0 whitespace-nowrap w-max marquee-track'>
        {track.map((word, i) => (
          <span
            key={i}
            className='font-display font-medium uppercase inline-flex items-center gap-6'
            style={{
              fontSize: '20px',
              color: 'var(--ds-bg)',
              padding: '0 26px',
              letterSpacing: '0.01em',
            }}
          >
            {word}
            <span style={{ color: 'var(--ds-accent)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
