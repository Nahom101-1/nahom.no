'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { type Lang, pickLang, pickListLang, translateLang } from '@/lib/lang';

export type { Lang };

export const LANGUAGE_NAMES_NO: Record<string, string> = {
  Norwegian: 'Norsk',
  English: 'Engelsk',
  Amharic: 'Amharisk',
  Tigrinya: 'Tigrinja',
};

export const LANGUAGE_LEVELS_NO: Record<string, string> = {
  Native: 'Morsmål',
  Fluent: 'Flytende',
  Professional: 'Profesjonell',
  Conversational: 'Samtale',
  Basic: 'Grunnleggende',
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('lang') === 'no' ? 'no' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'no' ? 'nb' : 'en';
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const { lang, setLang } = useContext(LanguageContext);
  const pick = (en?: string | null, no?: string | null) =>
    pickLang(lang, en, no);
  const pickList = (en?: string[], no?: string[]) => pickListLang(lang, en, no);
  const tr = (map: Record<string, string>, value: string) =>
    translateLang(lang, map, value);
  return { lang, setLang, pick, pickList, tr };
}
