'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import type { WorkExperience } from '@/types/sanity';
import { useLang } from '@/lib/i18n';

function formatYear(startDate: string, endDate?: string, isCurrent?: boolean): string {
  const start = new Date(startDate).getFullYear();
  if (isCurrent) return `${start} →`;
  if (!endDate) return String(start);
  const end = new Date(endDate).getFullYear();
  if (start === end) return String(start);
  return `'${String(start).slice(2)}—'${String(end).slice(2)}`;
}

const DEFAULT_EXPERIENCE: WorkExperience[] = [
  {
    _id: '1', _type: 'workExperience',
    company: 'Skatteetaten IT', position: 'Developer', positionNo: 'Utvikler', location: 'Trondheim',
    startDate: '2026-06-01', isCurrent: true,
    description: "Building an AI-based prototype for troubleshooting and optimization on the Tax Administration's Kubernetes platform: RAG, log data and dashboards.",
    descriptionNo: 'Bygger en KI-basert prototype for feilsøking og optimalisering på Skatteetatens Kubernetes-plattform: RAG, loggdata og dashboards.',
  },
  {
    _id: '2', _type: 'workExperience',
    company: 'NAV IT', position: 'Backend Developer, Intern', positionNo: 'Backendutvikler, praksis', location: 'Norway',
    startDate: '2025-01-01', endDate: '2025-12-31', isCurrent: false,
    description: 'Built backend services in Kotlin exposing data through REST APIs, plus Next.js frontend data visualizations used internally.',
    descriptionNo: 'Bygget backendtjenester i Kotlin som eksponerte data via REST API-er, pluss Next.js-datavisualiseringer brukt internt.',
  },
  {
    _id: '3', _type: 'workExperience',
    company: 'NTNU Start Gjøvik', position: 'IT Volunteer', positionNo: 'IT-frivillig', location: 'Gjøvik',
    startDate: '2024-01-01', endDate: '2026-06-01', isCurrent: false,
    description: 'Owned the domain, GitHub repo and ongoing site maintenance (React, Tailwind, Sanity), plus email accounts and user access.',
    descriptionNo: 'Ansvarlig for domenet, GitHub-repoet og løpende vedlikehold av nettsiden (React, Tailwind, Sanity), pluss e-postkontoer og brukertilgang.',
  },
  {
    _id: '4', _type: 'workExperience',
    company: 'Telia', position: 'Shop Assistant', positionNo: 'Butikkmedarbeider', location: 'Gjøvik',
    startDate: '2023-01-01', endDate: '2026-01-01', isCurrent: false,
    description: 'Customer service, sales and hands-on technical support in store.',
    descriptionNo: 'Kundeservice, salg og praktisk teknisk support i butikk.',
  },
];


export default function ExperienceSection({ experience }: { experience: WorkExperience[] }) {
  const { ui, pick } = useLang();
  const items = experience.length > 0 ? experience : DEFAULT_EXPERIENCE;

  return (
    <section
      id='experience'
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
          03 /
        </span>
        <div>
          <h2
            className='font-display font-extrabold uppercase'
            style={{ fontSize: 'clamp(34px, 6vw, 76px)', letterSpacing: '-0.03em', lineHeight: '0.9' }}
          >
            {ui.expTitle}
          </h2>
          <p className='font-mono uppercase mt-1' style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--ds-fg-muted)' }}>
            {ui.expSub}
          </p>
        </div>
      </motion.div>

      <div className='hairline-top'>
        {items.map((job, i) => (
          <motion.div
            key={job._id}
            variants={rv}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-7% 0px' }}
            transition={{ delay: i * 0.06 }}
            className='grid grid-cols-1 md:grid-cols-[90px_1.1fr_1.4fr_auto] gap-7 items-baseline py-7 section-border transition-all duration-300 md:hover:px-5'
            style={{ borderBottom: '1px solid var(--ds-border)' }}
          >
            <span
              className='font-mono text-[13px]'
              style={{ color: 'var(--ds-accent)', letterSpacing: '0.06em' }}
            >
              {formatYear(job.startDate, job.endDate, job.isCurrent)}
            </span>

            <span>
              <span
                className='font-display font-bold block'
                style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', letterSpacing: '-0.02em', lineHeight: '1.05' }}
              >
                {pick(job.position, job.positionNo)}
              </span>
              <span
                className='font-mono uppercase mt-1.5 block'
                style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--ds-fg-muted)' }}
              >
                {job.company}{job.location ? ` · ${job.location}` : ''}
              </span>
            </span>

            <span
              className='font-serif'
              style={{ fontSize: '16px', lineHeight: '1.55', color: '#3c3a32' }}
            >
              {pick(job.description, job.descriptionNo)}
            </span>

            {job.badge ? (
              <span
                className='font-mono uppercase rounded-full h-fit self-start'
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  color: 'var(--ds-accent)',
                  border: '1px solid var(--ds-accent)',
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {job.badge}
              </span>
            ) : (
              <span />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
