'use client';
import { type WorkExperience } from '@/types/sanity';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Navbar } from '../layout/navbar';
import SplitText from '../effects/SplitText';
import CurrentlyPlaying from './CurrentlyPlaying';
import ScrollStack, { ScrollStackItem } from '../effects/ScrollStack';

export default function WorkExperienceSection({
  workExperience,
}: {
  workExperience: WorkExperience[];
}) {
  console.log('Work Experience Data:', workExperience); // Debug log

  return (
    <div className='relative h-[100dvh] w-full overflow-hidden'>
      {/* Background Container */}
      <div className='absolute inset-0 bg-black' />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60' />

      {/* Title */}
      <div className='absolute top-4 sm:top-8 left-0 right-0 z-20 w-full px-6 sm:px-16 md:px-20'>
        <SplitText
          text='EXPERIENCE'
          className='text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white tracking-tight'
          delay={100}
          duration={0.6}
          ease='power3.out'
          splitType='chars'
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin='-100px'
          textAlign='center'
        />
      </div>

      <Navbar />

      {/* Work Experience Stack Section */}
      <div className='absolute inset-x-0 bottom-0 z-10' style={{ top: '25vh' }}>
        <ScrollStack
          itemDistance={40}
          itemScale={0.05}
          baseScale={0.85}
          rotationAmount={0}
          stackPosition='30%'
          scaleEndPosition='20%'
          className='w-full'
          useWindowScroll={true}
        >
          {workExperience.map(work => (
            <ScrollStackItem
              key={work._id}
              itemClassName='bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20'
            >
              <div className='flex flex-col h-full'>
                {/* Header: Company & Position */}
                <div className='flex items-start justify-between mb-6'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-16 h-16 bg-white/5 rounded-lg p-2'>
                      <Image
                        src={work.imageUrl || '/placeholder.jpg'}
                        alt={`${work.company} logo`}
                        width={64}
                        height={64}
                        className='w-full h-full object-contain filter brightness-0 invert opacity-80'
                        priority
                      />
                    </div>
                    <div>
                      <h3 className='text-xl sm:text-2xl font-light text-white font-didot tracking-wide leading-tight'>
                        {work.company}
                      </h3>
                      {work.location && (
                        <p className='text-sm text-muted-foreground font-light tracking-wider uppercase'>
                          {work.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm text-gray-300 font-light tracking-wide'>
                      {work.startDate} —{' '}
                      {work.isCurrent ? 'Present' : work.endDate || 'Present'}
                    </p>
                    {work.isCurrent && (
                      <Badge
                        variant='outline'
                        className='text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 font-medium tracking-wider mt-2'
                      >
                        CURRENT
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Position & Description */}
                <div className='mb-6'>
                  <p className='text-lg text-white font-light leading-relaxed mb-3'>
                    {work.position}
                  </p>
                  {work.description && (
                    <p className='text-sm text-gray-300 font-light leading-relaxed'>
                      {work.description}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className='mt-auto space-y-4'>
                  {/* Technologies */}
                  {work.technologies && work.technologies.length > 0 && (
                    <div>
                      <span className='text-xs text-muted-foreground uppercase tracking-wider block mb-2'>
                        Technologies
                      </span>
                      <div className='flex flex-wrap gap-1.5'>
                        {work.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant='outline'
                            className='text-gray-300 border-gray-600/30 bg-gray-800/20 hover:bg-gray-700/30 font-light text-xs'
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learnings */}
                  {work.learnings && work.learnings.length > 0 && (
                    <div>
                      <span className='text-xs text-muted-foreground uppercase tracking-wider block mb-2'>
                        Key Learnings
                      </span>
                      <div className='flex flex-wrap gap-1.5'>
                        {work.learnings.map((learning, learningIndex) => (
                          <Badge
                            key={learningIndex}
                            variant='outline'
                            className='text-gray-400 border-gray-600/20 bg-gray-900/30 hover:bg-gray-800/30 font-light text-xs'
                          >
                            {learning}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* CurrentlyPlaying */}
      <div className='fixed md:absolute bottom-0 left-0 md:left-auto md:right-0 p-4 md:p-8 z-50 w-full md:w-auto'>
        <CurrentlyPlaying />
      </div>
    </div>
  );
}
