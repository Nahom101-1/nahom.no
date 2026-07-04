import { describe, expect, it } from 'vitest';
import { pickLang, pickListLang, translateLang } from '@/lib/lang';

describe('pickLang', () => {
  it('prefers english in en mode', () => {
    expect(pickLang('en', 'Hello', 'Hei')).toBe('Hello');
  });

  it('prefers norwegian in no mode', () => {
    expect(pickLang('no', 'Hello', 'Hei')).toBe('Hei');
  });

  it('falls back to english when norwegian is missing', () => {
    expect(pickLang('no', 'Hello', null)).toBe('Hello');
  });
});

describe('pickListLang', () => {
  it('uses norwegian list when available', () => {
    expect(pickListLang('no', ['a'], ['b'])).toEqual(['b']);
  });

  it('falls back to english list', () => {
    expect(pickListLang('no', ['a'], [])).toEqual(['a']);
  });
});

describe('translateLang', () => {
  const map = { Norwegian: 'Norsk' };

  it('translates known values in no mode', () => {
    expect(translateLang('no', map, 'Norwegian')).toBe('Norsk');
  });

  it('returns original value in en mode', () => {
    expect(translateLang('en', map, 'Norwegian')).toBe('Norwegian');
  });
});
