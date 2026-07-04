'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'no';

const UI = {
  en: {
    navWork: 'Work',
    navExperience: 'Experience',
    navAbout: 'About',
    navContact: 'Contact',
    sayHello: 'Say hello',
    resumeLabel: 'Résumé ↓',
    portfolioIndex: 'Portfolio — Index',
    aboutTitle: 'About',
    aboutSub: 'A short introduction',
    workTitle: 'Selected Work',
    workSub: 'Four pieces · 2024—2026',
    expTitle: 'Experience',
    expSub: "Where I've worked",
    toolkitTitle: 'Toolkit',
    toolkitSub: 'Languages, frameworks & methods',
    eduTitle: 'Education',
    eduSub: '& spoken languages',
    languagesHeader: 'Languages',
    present: 'Present',
    grade: 'Grade',
    offTitle: 'Off the clock',
    offSub: 'Now playing & recently watched',
    nowPlaying: 'Now Playing',
    nothingPlaying: 'Nothing playing',
    nothingPlayingSub: 'Nothing is currently playing.',
    recentlyWatched: 'Recently Watched',
    emailMe: 'Email me',
    contactKicker: 'Open to graduate roles & collaborations',
    resumeEn: 'Résumé ↓',
    resumeNo: 'CV (norsk) ↓',
  },
  no: {
    navWork: 'Arbeid',
    navExperience: 'Erfaring',
    navAbout: 'Om meg',
    navContact: 'Kontakt',
    sayHello: 'Si hei',
    resumeLabel: 'CV ↓',
    portfolioIndex: 'Portefølje — Indeks',
    aboutTitle: 'Om meg',
    aboutSub: 'En kort introduksjon',
    workTitle: 'Utvalgt arbeid',
    workSub: 'Fire prosjekter · 2024—2026',
    expTitle: 'Erfaring',
    expSub: 'Hvor jeg har jobbet',
    toolkitTitle: 'Verktøy',
    toolkitSub: 'Språk, rammeverk og metoder',
    eduTitle: 'Utdanning',
    eduSub: '& språk',
    languagesHeader: 'Språk',
    present: 'Nå',
    grade: 'Karakter',
    offTitle: 'Utenom jobb',
    offSub: 'Spiller nå & nylig sett',
    nowPlaying: 'Spiller nå',
    nothingPlaying: 'Ingenting spilles',
    nothingPlayingSub: 'Ingenting spilles akkurat nå.',
    recentlyWatched: 'Nylig sett',
    emailMe: 'Send e-post',
    contactKicker: 'Åpen for stillinger og samarbeid',
    resumeEn: 'CV (engelsk) ↓',
    resumeNo: 'CV (norsk) ↓',
  },
} as const;

export const HIGHLIGHT_LABELS_NO: Record<string, string> = {
  Now: 'Nå',
  Prev: 'Før',
  Stack: 'Stack',
};

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

export const SKILL_CATEGORIES_NO: Record<string, string> = {
  Languages: 'Språk',
  Frontend: 'Frontend',
  'Backend & Data': 'Backend & data',
  'AI & Integration': 'KI & integrasjon',
  Tooling: 'Verktøy',
  Method: 'Metodikk',
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
  const ui = UI[lang];
  const pick = (en?: string | null, no?: string | null) =>
    (lang === 'no' ? (no ?? en) : en) ?? undefined;
  const pickList = (en?: string[], no?: string[]) =>
    lang === 'no' && no && no.length > 0 ? no : en;
  const tr = (map: Record<string, string>, value: string) =>
    lang === 'no' ? (map[value] ?? value) : value;
  return { lang, setLang, ui, pick, pickList, tr };
}
