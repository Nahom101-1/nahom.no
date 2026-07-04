'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'no';

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

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'no') setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'no' ? 'nb' : 'en';
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const { lang, setLang } = useContext(LanguageContext);
  const pick = (en?: string | null, no?: string | null) =>
    (lang === 'no' ? (no ?? en) : en) ?? undefined;
  const pickList = (en?: string[], no?: string[]) =>
    lang === 'no' && no && no.length > 0 ? no : en;
  const tr = (map: Record<string, string>, value: string) =>
    lang === 'no' ? (map[value] ?? value) : value;
  return { lang, setLang, pick, pickList, tr };
}
