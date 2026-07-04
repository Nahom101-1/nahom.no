import { describe, expect, it } from 'vitest';
import { ageFrom, cn, formatExperienceYear } from '@/lib/utils';

describe('cn', () => {
  it('merges tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});

describe('ageFrom', () => {
  const now = new Date('2026-07-04');

  it('returns null without birth date', () => {
    expect(ageFrom(undefined, now)).toBeNull();
  });

  it('returns null for invalid date', () => {
    expect(ageFrom('not-a-date', now)).toBeNull();
  });

  it('calculates age before birthday', () => {
    expect(ageFrom('2000-12-01', now)).toBe(25);
  });

  it('calculates age after birthday', () => {
    expect(ageFrom('2000-01-01', now)).toBe(26);
  });
});

describe('formatExperienceYear', () => {
  it('shows arrow for current role', () => {
    expect(formatExperienceYear('2026-06-01', undefined, true)).toBe('2026 →');
  });

  it('formats a range across years', () => {
    expect(formatExperienceYear('2023-01-01', '2025-12-31', false)).toBe(
      "'23—'25"
    );
  });

  it('shows single year when start and end match', () => {
    expect(formatExperienceYear('2024-01-01', '2024-12-31', false)).toBe(
      '2024'
    );
  });
});
