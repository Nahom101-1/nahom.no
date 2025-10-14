'use client';
import { type Education } from '@/types/sanity';
import { urlFor } from '@/lib/sanity';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Navbar } from '../layout/navbar';
import SplitText from '../effects/SplitText';

export default function EducationSection({
  education,
}: {
  education: Education[];
}) {
  return (
    <div className='relative h-[100dvh] w-full overflow-hidden'>
      {/* Background Container */}
      <div className='absolute inset-0 bg-black' />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60' />

      {/* Title */}
      <div className='absolute top-4 sm:top-8 left-0 right-0 z-20 w-full px-6 sm:px-16 md:px-20'>
        <SplitText
          text='EDUCATION'
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

      {/* Education Cards Section */}
      <div
        className='absolute inset-x-0 bottom-0 z-10 overflow-y-auto'
        style={{ top: '25vh' }}
      >
        <div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16 sm:pb-24'>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 lg:gap-12'>
            {education.map((edu, index) => (
              <div key={edu._id} className='relative group'>
                <Card className='bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:border-white/20'>
                  <CardContent className='p-3 sm:p-6 md:p-8'>
                    <div className='grid grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-start'>
                      {/* Left: Institution & Logo */}
                      <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
                        <CardHeader className='p-0 space-y-6 group'>
                          {/* Main Institution Image */}
                          <div className='aspect-video w-full overflow-hidden rounded-xl bg-gray-900 transition-all duration-700 group-hover:shadow-2xl relative'>
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                            <Image
                              src={
                                edu.picture
                                  ? urlFor(edu.picture).toString()
                                  : '/placeholder.jpg.png'
                              }
                              alt={`${edu.institution} campus`}
                              width={800}
                              height={450}
                              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                              priority
                            />
                          </div>

                          {/* Institution Logo */}
                          <div className='w-16 h-16'>
                            <Image
                              src={
                                edu.institutionLogo
                                  ? urlFor(edu.institutionLogo).toString()
                                  : '/placeholder.jpg.png'
                              }
                              alt={`${edu.institution} logo`}
                              width={64}
                              height={64}
                              className='w-full h-full object-contain filter brightness-0 invert opacity-80'
                              priority
                            />
                          </div>

                          <h3 className='text-lg sm:text-xl md:text-2xl font-light text-white font-didot tracking-wide leading-tight group-hover:text-white/90 transition-colors duration-300'>
                            {edu.institution}
                          </h3>

                          {edu.location && (
                            <p className='text-xs sm:text-sm text-muted-foreground font-light tracking-wider uppercase'>
                              {edu.location}
                            </p>
                          )}
                        </CardHeader>
                      </div>

                      {/* Center: Program Details */}
                      <div className='col-span-12 md:col-span-5 lg:col-span-6'>
                        <div className='space-y-2 sm:space-y-3'>
                          <p className='text-sm sm:text-base md:text-lg text-white font-light leading-relaxed'>
                            {edu.degree}
                          </p>

                          {edu.fieldOfStudy && (
                            <p className='text-xs sm:text-sm text-gray-300 font-light italic'>
                              {edu.fieldOfStudy}
                            </p>
                          )}

                          {edu.gpa && (
                            <div className='pt-1 sm:pt-2'>
                              <span className='text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider'>
                                GPA
                              </span>
                              <p className='text-sm sm:text-base text-white font-light'>
                                {edu.gpa.toFixed(2)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Timeline & Status */}
                      <div className='col-span-12 md:col-span-3 lg:col-span-3 md:text-right'>
                        <div className='space-y-2 sm:space-y-3'>
                          <p className='text-xs sm:text-sm text-gray-300 font-light tracking-wide'>
                            {edu.startDate} —{' '}
                            {edu.isCurrent
                              ? 'Present'
                              : edu.endDate || 'Present'}
                          </p>

                          {edu.isCurrent && (
                            <Badge
                              variant='outline'
                              className='text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 font-medium tracking-wider'
                            >
                              CURRENT
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Separator between entries */}
                {index < education.length - 1 && (
                  <div className='my-6 sm:my-8 md:my-12 lg:my-16'>
                    <Separator className='bg-white/10' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CurrentlyPlaying */}
      {/* <div className='fixed md:absolute bottom-0 left-0 md:left-auto md:right-0 p-4 md:p-8 z-50 w-full md:w-auto'>
        <CurrentlyPlaying />
      </div> */}
    </div>
  );
}
