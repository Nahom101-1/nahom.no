'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import type { Education, Language, SiteSettings } from '@/types/sanity';
import { useLang, LANGUAGE_NAMES_NO, LANGUAGE_LEVELS_NO } from '@/lib/i18n';
import { label } from '@/lib/cms';

export default function EducationSection({
  education,
  languages,
  settings,
}: {
  education: Education | null;
  languages?: Language[];
  settings: SiteSettings | null;
}) {
  const { lang, pick, tr } = useLang();

  const title = label(settings, lang, 'educationHeading', 'educationHeadingNo');
  const subtitle = label(
    settings,
    lang,
    'educationSubheading',
    'educationSubheadingNo'
  );
  const languagesHeader = label(
    settings,
    lang,
    'languagesHeading',
    'languagesHeadingNo'
  );
  const present = label(settings, lang, 'presentLabel', 'presentLabelNo');
  const gradeLabel = label(settings, lang, 'gradeLabel', 'gradeLabelNo');

  const degreeName = education
    ? pick(education.degree, education.degreeNo)
    : undefined;
  const fieldName = education
    ? pick(education.fieldOfStudy, education.fieldOfStudyNo)
    : undefined;
  const degree =
    education && degreeName
      ? `${degreeName}${fieldName ? ` / ${fieldName}` : ''}`
      : undefined;

  const school = education
    ? `${education.institution}${education.location ? ` · ${education.location}` : ''}`
    : undefined;

  const years = education
    ? `${new Date(education.startDate).getFullYear()}—${education.endDate ? new Date(education.endDate).getFullYear() : present}`
    : undefined;

  const courses =
    education?.relevantClasses?.map(c => ({
      name: pick(c.courseName, c.courseNameNo) ?? c.courseName,
      grade: c.grade,
    })) ?? [];

  const spokenLanguages = languages ?? [];

  if (!education && spokenLanguages.length === 0) return null;

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
        <span
          className='font-mono text-[13px]'
          style={{ color: 'var(--ds-accent)' }}
        >
          05 /
        </span>
        <div>
          {title ? (
            <h2
              className='font-display font-extrabold uppercase'
              style={{
                fontSize: 'clamp(34px, 6vw, 76px)',
                letterSpacing: '-0.03em',
                lineHeight: '0.9',
              }}
            >
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p
              className='font-mono uppercase mt-1'
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: 'var(--ds-fg-muted)',
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-16 items-start'>
        {education ? (
          <motion.div
            variants={rv}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-7% 0px' }}
          >
            {degree ? (
              <div
                className='font-display font-bold'
                style={{
                  fontSize: 'clamp(28px, 3.4vw, 46px)',
                  letterSpacing: '-0.025em',
                  lineHeight: '1',
                }}
              >
                {degree}
              </div>
            ) : null}
            {school && years ? (
              <div
                className='font-mono uppercase mt-4 mb-7'
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  color: 'var(--ds-accent)',
                }}
              >
                {school} · {years}
                {education.gpa && gradeLabel
                  ? ` · ${gradeLabel} ${education.gpa}`
                  : ''}
              </div>
            ) : null}
            {courses.length > 0 && (
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
            )}
          </motion.div>
        ) : (
          <div />
        )}

        {spokenLanguages.length > 0 && languagesHeader ? (
          <motion.div
            variants={rv}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-7% 0px' }}
            transition={{ delay: 0.1 }}
          >
            <h4
              className='font-mono uppercase mb-5'
              style={{
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: 'var(--ds-fg-muted)',
              }}
            >
              {languagesHeader}
            </h4>
            {spokenLanguages.map(item => (
              <div
                key={item.name}
                className='flex justify-between items-baseline py-3.5'
                style={{ borderBottom: '1px solid var(--ds-border)' }}
              >
                <span
                  className='font-display font-bold'
                  style={{ fontSize: '24px', letterSpacing: '-0.02em' }}
                >
                  {tr(LANGUAGE_NAMES_NO, item.name)}
                </span>
                <span
                  className='font-mono uppercase'
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    color: 'var(--ds-fg-muted)',
                  }}
                >
                  {item.level ? tr(LANGUAGE_LEVELS_NO, item.level) : ''}
                </span>
              </div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
