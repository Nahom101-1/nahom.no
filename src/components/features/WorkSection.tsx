'use client';
import { motion } from 'motion/react';
import { rv } from '@/lib/motion';
import Image from 'next/image';
import type { Project } from '@/types/sanity';

const DEFAULT_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'AI Travel Assistant',
    year: 2025,
    description:
      'A web app that generates travel itineraries with language models and external APIs — built with a careful eye on token economy and privacy.',
    stack: ['Next.js', 'LLM', 'Firebase', 'Scrum'],
  },
  {
    _id: '2',
    title: 'Countries Dashboard API',
    year: 2024,
    description:
      'A REST service with webhook notifications and saved dashboard configs. It pulls weather and currency data and runs in Docker on OpenStack.',
    stack: ['Go', 'REST', 'PostgreSQL', 'Docker'],
  },
  {
    _id: '3',
    title: 'E-commerce Data Model',
    year: 2024,
    description:
      'Designed and normalized the relational schema for a full-stack e-commerce platform.',
    stack: ['PostgreSQL', 'SQL', 'Node.js', 'Docker'],
  },
  {
    _id: '4',
    title: 'nahom.no — Portfolio',
    year: 2025,
    description:
      'My personal site with projects and contact info. Content is managed in Sanity so it can be updated without redeploying.',
    stack: ['React', 'Next.js', 'Tailwind', 'Sanity'],
  },
];


function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      variants={rv}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-7% 0px' }}
      transition={{ delay: (index % 2) * 0.1 }}
      className='group cursor-pointer hairline-top pt-5 pb-8'
    >
      <div className='flex justify-between items-baseline mb-5'>
        <span className='font-mono text-[12px]' style={{ color: 'var(--ds-accent)' }}>
          № {num}
        </span>
        <span className='font-mono text-[11px]' style={{ letterSpacing: '0.08em', color: 'var(--ds-fg-muted)' }}>
          {project.year}
        </span>
      </div>

      <div
        className='overflow-hidden border'
        style={{ borderColor: 'var(--ds-border)' }}
      >
        {project.imageUrl ? (
          <div className='relative w-full' style={{ height: '300px' }}>
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className='object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]'
              sizes='(max-width: 820px) 100vw, 50vw'
            />
          </div>
        ) : (
          <div
            className='w-full flex items-center justify-center font-mono text-[11px] uppercase transition-transform duration-700 group-hover:scale-[1.04]'
            style={{
              height: '300px',
              background: 'var(--ds-bg-surface)',
              color: 'var(--ds-fg-muted)',
              letterSpacing: '0.12em',
            }}
          >
            {project.title}
          </div>
        )}
      </div>

      <h3
        className='font-display font-bold mt-6 transition-colors duration-300 group-hover:text-accent'
        style={{ fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.02em', lineHeight: '1' }}
      >
        {project.title}
      </h3>

      <p
        className='font-serif mt-3'
        style={{ fontSize: '17px', lineHeight: '1.55', color: '#3c3a32', maxWidth: '42ch' }}
      >
        {project.description}
      </p>

      <div className='flex flex-wrap gap-2 mt-4'>
        {project.stack.map(s => (
          <span
            key={s}
            className='font-mono uppercase border rounded-full'
            style={{
              fontSize: '10px',
              letterSpacing: '0.06em',
              color: 'var(--ds-fg-muted)',
              borderColor: 'var(--ds-border)',
              padding: '4px 10px',
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function WorkSection({ projects }: { projects: Project[] }) {
  const items = projects.length > 0 ? projects : DEFAULT_PROJECTS;

  return (
    <section
      id='work'
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
          02 /
        </span>
        <div>
          <h2
            className='font-display font-extrabold uppercase'
            style={{ fontSize: 'clamp(34px, 6vw, 76px)', letterSpacing: '-0.03em', lineHeight: '0.9' }}
          >
            Selected Work
          </h2>
          <p className='font-mono uppercase mt-1' style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--ds-fg-muted)' }}>
            Four pieces · 2024—2026
          </p>
        </div>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-14' style={{ gap: '4px 56px' }}>
        {items.slice(0, 4).map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
