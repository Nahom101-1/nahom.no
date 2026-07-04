import type { Lang } from '@/lib/i18n';
import type { SiteSettings } from '@/types/sanity';

export function label(
  settings: SiteSettings | null | undefined,
  lang: Lang,
  en: keyof SiteSettings,
  no?: keyof SiteSettings
): string | undefined {
  const read = (key: keyof SiteSettings) => {
    const value = settings?.[key];
    return typeof value === 'string' && value.length > 0 ? value : undefined;
  };
  if (lang === 'no' && no) return read(no) ?? read(en);
  return read(en);
}
