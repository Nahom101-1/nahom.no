import { describe, expect, it } from 'vitest';
import { buildPortraitUrl, hasPortraitAsset } from '@/lib/portrait-url';

describe('hasPortraitAsset', () => {
  it('returns true when asset ref exists', () => {
    expect(hasPortraitAsset({ asset: { _ref: 'image-123' } })).toBe(true);
  });

  it('returns false for missing portrait', () => {
    expect(hasPortraitAsset(undefined)).toBe(false);
    expect(hasPortraitAsset({})).toBe(false);
  });
});

describe('buildPortraitUrl', () => {
  it('builds url when portrait asset exists', () => {
    const url = buildPortraitUrl(
      { asset: { _ref: 'image-123' } },
      () => 'https://cdn.test/portrait.jpg'
    );
    expect(url).toBe('https://cdn.test/portrait.jpg');
  });

  it('returns undefined without asset', () => {
    expect(
      buildPortraitUrl(null, () => 'https://cdn.test/portrait.jpg')
    ).toBeUndefined();
  });
});
