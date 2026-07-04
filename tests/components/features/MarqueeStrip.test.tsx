import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MarqueeStrip from '@/components/features/MarqueeStrip';

describe('MarqueeStrip', () => {
  it('renders nothing without words', () => {
    const { container } = render(<MarqueeStrip />);
    expect(container.firstChild).toBeNull();
  });

  it('duplicates words for seamless marquee', () => {
    render(<MarqueeStrip words={['Backend', 'Go']} />);
    expect(screen.getAllByText('Backend')).toHaveLength(2);
    expect(screen.getAllByText('Go')).toHaveLength(2);
  });
});
