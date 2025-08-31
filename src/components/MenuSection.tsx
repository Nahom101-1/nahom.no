'use client';

type Props = {
  variant?: 'hero' | 'sticky'; // 'hero' = absolute in the hero; 'sticky' = fixed at page bottom
};

export default function MenuSection({ variant = 'hero' }: Props) {
  const basePos =
    variant === 'hero'
      ? 'absolute bottom-0 left-0 right-0'
      : 'sticky bottom-0 left-0 right-0';

  return (
    <nav
      className={[
        basePos,
        // layout
        'z-30 px-6 py-5',
        // slight readability boost over busy backgrounds:
        'backdrop-blur-[2px] bg-black/0',
      ].join(' ')}
      aria-label='Section navigation'
    >
      {/* pad-left to avoid the round "N" button in your corner (tweak as needed) */}
      <ul className='ml-12 md:ml-16 flex flex-wrap items-bottom gap-8 text-white'>
        {[
          { id: 'projects', label: 'Projects' },
          { id: 'experience', label: 'Experience' },
          { id: 'education', label: 'Education' },
          { id: 'skills', label: 'Skills' },
        ].map(({ id, label }) => (
          <li key={id} className='list-none'>
            <a
              href={`#${id}`}
              className='
                text-lg font-semibold tracking-wide
                transition-opacity hover:opacity-80 focus:opacity-80
                underline-offset-[6px] hover:underline focus:underline
                focus:outline-none
              '
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
