const DEFAULT_WORDS = [
  'Backend', 'AI Integration', 'REST APIs', 'RAG',
  'PostgreSQL', 'Kubernetes', 'Go', 'Kotlin',
];

export default function MarqueeStrip({ words }: { words?: string[] }) {
  const items = words && words.length > 0 ? words : DEFAULT_WORDS;
  // Duplicate the track for a seamless loop
  const track = [...items, ...items];

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
