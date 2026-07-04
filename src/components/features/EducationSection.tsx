'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import type { Education, Language } from '@/types/sanity';
import { useLang, LANGUAGE_NAMES_NO, LANGUAGE_LEVELS_NO } from '@/lib/i18n';

const DEFAULT_COURSES = {
  en: [
    { name: 'Algorithms & Data Structures', grade: '' },
    { name: 'Databases', grade: '' },
    { name: 'Cloud Technologies', grade: '' },
    { name: 'Robust & Scalable Services', grade: '' },
  ],
  no: [
    { name: 'Algoritmer og datastrukturer', grade: '' },
    { name: 'Databaser', grade: '' },
    { name: 'Skytjenester', grade: '' },
    { name: 'Robuste og skalerbare tjenester', grade: '' },
  ],
};

const DEFAULT_LANGUAGES: Language[] = [
  { name: 'Norwegian', level: 'Fluent' },
  { name: 'English', level: 'Fluent' },
  { name: 'Amharic', level: 'Native' },
  { name: 'Tigrinya', level: 'Native' },
];


export default function EducationSection({
  education,
  languages,
}: {
  education: Education | null;
  languages?: Language[];
}) {
  const { lang, ui, pick, tr } = useLang();

  const degreeName = education ? pick(education.degree, education.degreeNo) : undefined;
  const fieldName = education
    ? pick(education.fieldOfStudy, education.fieldOfStudyNo)
    : undefined;
  const degree = education
    ? `${degreeName}${fieldName ? ` / ${fieldName}` : ''}`
    : lang === 'no'
      ? 'Bachelor, Programmering / IT'
      : 'BSc, Programming / IT';

  const school = education
    ? `${education.institution}${education.location ? ` · ${education.location}` : ''}`
    : 'NTNU Gjøvik';

  const years = education
    ? `${new Date(education.startDate).getFullYear()}—${education.endDate ? new Date(education.endDate).getFullYear() : ui.present}`
    : '2023—2026';

  const courses =
    education?.relevantClasses && education.relevantClasses.length > 0
      ? education.relevantClasses.map(c => ({
          name: pick(c.courseName, c.courseNameNo) ?? c.courseName,
          grade: c.grade,
        }))
      : DEFAULT_COURSES[lang];

  const spokenLanguages =
    languages && languages.length > 0 ? languages : DEFAULT_LANGUAGES;

  const gpa = education?.gpa;

  return (
    <section
      id='education'
      className='page-wrap section-border'
      style={{ paddingTop: '110px', paddingBottom: '110px' }}
    >
      <motion.div
        variants={rv}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-7% 0px' }}
        className='grid items-baseline gap-4 mb-14'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <span className='font-mono text-[13px]' style={{ color: 'var(--ds-accent)' }}>
          05 /
        </span>
        <div>
          <h2
            className='font-display font-extrabold uppercase'
            style={{ fontSize: 'clamp(34px, 6vw, 76px)', letterSpacing: '-0.03em', lineHeight: '0.9' }}
          >
            {ui.eduTitle}
          </h2>
          <p className='font-mono uppercase mt-1' style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--ds-fg-muted)' }}>
            {ui.eduSub}
          </p>
        </div>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-16 items-start'>
        <motion.div
          variants={rv}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-7% 0px' }}
        >
          <div
            className='font-display font-bold'
            style={{ fontSize: 'clamp(28px, 3.4vw, 46px)', letterSpacing: '-0.025em', lineHeight: '1' }}
          >
            {degree}
          </div>
          <div
            className='font-mono uppercase mt-4 mb-7'
            style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--ds-accent)' }}
          >
            {school} · {years}
            {gpa ? ` · ${ui.grade} ${gpa}` : ''}
          </div>
          <div className='flex flex-wrap gap-2'>
            {courses.map(course => (
              <span
                key={course.name}
                className='font-serif border rounded-full inline-flex items-center gap-2'
                style={{
                  fontSize: '16px',
                  borderColor: 'var(--ds-border)',
                  padding: '7px 14px',
                }}
              >
                {course.name}
                {course.grade ? (
                  <span
                    className='font-mono'
                    style={{ fontSize: '11px', color: 'var(--ds-accent)' }}
                  >
                    {course.grade}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={rv}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-7% 0px' }}
          transition={{ delay: 0.1 }}
        >
          <h4
            className='font-mono uppercase mb-5'
            style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--ds-fg-muted)' }}
          >
            {ui.languagesHeader}
          </h4>
          {spokenLanguages.map(lang => (
            <div
              key={lang.name}
              className='flex justify-between items-baseline py-3.5'
              style={{ borderBottom: '1px solid var(--ds-border)' }}
            >
              <span
                className='font-display font-bold'
                style={{ fontSize: '24px', letterSpacing: '-0.02em' }}
              >
                {tr(LANGUAGE_NAMES_NO, lang.name)}
              </span>
              <span
                className='font-mono uppercase'
                style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'var(--ds-fg-muted)' }}
              >
                {lang.level ? tr(LANGUAGE_LEVELS_NO, lang.level) : ''}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
