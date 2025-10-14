'use client';

import { Navbar } from '@/components/layout/navbar';
import SplitText from '@/components/effects/SplitText';
import InfiniteScroll from '@/components/effects/InfiniteScroll';

const relevantCourses = [
  {
    name: 'Algoritmer og datastrukturer',
    description:
      'Fundamentale konsepter innen algoritmisk problemløsning og effektiv dataorganisering.',
  },
  {
    name: 'Databaser og databasedesign',
    description:
      'Design og implementering av robuste databaseløsninger og datamodellering.',
  },
  {
    name: 'Programvareutvikling',
    description:
      'Moderne utviklingsmetodikker og beste praksis for programvareutvikling.',
  },
  {
    name: 'Skyteknologier',
    description:
      'Cloud computing, distribuerte systemer og moderne skybaserte løsninger.',
  },
  {
    name: 'Robuste og skalerbare tjenester',
    description:
      'Utvikling av pålitelige og skalerbare systemer med fokus på ytelse og stabilitet.',
  },
];

// Transform courses into items for InfiniteScroll
const scrollItems = relevantCourses.map(course => ({
  content: (
    <div>
      <h3 className='text-xl font-light text-white mb-2 font-didot tracking-wide'>
        {course.name}
      </h3>
      <p className='text-sm text-gray-400 font-light leading-relaxed'>
        {course.description}
      </p>
    </div>
  ),
}));

// Double the items to ensure smooth infinite scroll
const doubledItems = [...scrollItems, ...scrollItems];

export default function CoursesPage() {
  return (
    <div className='relative min-h-[100dvh] w-full bg-black text-white overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black' />

      <Navbar />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center pt-20 px-4'>
        {/* Main Title */}
        <div className='mb-16'>
          <SplitText
            text='RELEVANT COURSES'
            className='text-4xl md:text-6xl font-bold text-center tracking-tight'
            delay={100}
            duration={0.6}
            ease='power3.out'
            splitType='chars'
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin='-100px'
          />
        </div>

        {/* Description */}
        <div className='max-w-2xl text-center mb-12'>
          <SplitText
            text='Key subjects and courses that have shaped my technical expertise and knowledge base.'
            className='text-lg md:text-xl font-light text-gray-400 tracking-wide'
            delay={400}
            duration={0.8}
            ease='power2.out'
            splitType='words'
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin='-100px'
          />
        </div>

        {/* Infinite Scroll Courses */}
        <div
          className='w-full max-w-2xl mx-auto'
          style={{ height: '50vh', position: 'relative' }}
        >
          <InfiniteScroll
            items={doubledItems}
            isTilted={true}
            tiltDirection='left'
            autoplay={true}
            autoplaySpeed={2.5}
            autoplayDirection='down'
            pauseOnHover={true}
          />
        </div>
      </div>
    </div>
  );
}
