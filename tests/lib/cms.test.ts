import { describe, expect, it } from 'vitest';
import { label } from '@/lib/cms';
import type { SiteSettings } from '@/types/sanity';

const settings: SiteSettings = {
  aboutHeading: 'About',
  aboutHeadingNo: 'Om meg',
  navWork: 'Work',
};

describe('label', () => {
  it('returns english field for en', () => {
    expect(label(settings, 'en', 'aboutHeading', 'aboutHeadingNo')).toBe(
      'About'
    );
  });

  it('returns norwegian field for no', () => {
    expect(label(settings, 'no', 'aboutHeading', 'aboutHeadingNo')).toBe(
      'Om meg'
    );
  });

  it('falls back to english when norwegian is missing', () => {
    expect(label(settings, 'no', 'navWork', 'navWorkNo')).toBe('Work');
  });

  it('returns undefined for missing settings', () => {
    expect(label(null, 'en', 'aboutHeading')).toBeUndefined();
  });

  it('ignores empty strings', () => {
    expect(label({ aboutHeading: '' }, 'en', 'aboutHeading')).toBeUndefined();
  });
});
