export type Lang = 'en' | 'no';

export function pickLang(
  lang: Lang,
  en?: string | null,
  no?: string | null
): string | undefined {
  return (lang === 'no' ? (no ?? en) : en) ?? undefined;
}

export function pickListLang(
  lang: Lang,
  en?: string[],
  no?: string[]
): string[] | undefined {
  if (lang === 'no' && no && no.length > 0) return no;
  return en;
}

export function translateLang(
  lang: Lang,
  map: Record<string, string>,
  value: string
): string {
  return lang === 'no' ? (map[value] ?? value) : value;
}
