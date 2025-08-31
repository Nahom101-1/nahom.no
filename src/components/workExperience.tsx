import { type WorkExperience } from '@/types/sanity';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function WorkExperienceSection({
  workExperience,
}: {
  workExperience: WorkExperience[];
}) {
  return (
    <section className='min-h-screen bg-black py-24 px-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='mb-20'>
          <h2 className='text-5xl md:text-6xl font-light tracking-wider text-white font-didot text-center'>
            EXPERIENCE
          </h2>
        </div>

        {/* Work Experience Entries */}
        <div className='space-y-8'>
          {workExperience.map((work, index) => (
            <div key={work._id}>
              <Card className='bg-transparent border-none shadow-none p-0'>
                <CardContent className='p-0'>
                  <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 items-start'>
                    {/* Left: Company & Logo */}
                    <div className='lg:col-span-1'>
                      <CardHeader className='p-0 space-y-4'>
                        {work.picture && (
                          <div className='w-16 h-16 mb-6'>
                            <img
                              src={work.imageUrl || '/placeholder.jpg'}
                              alt={`${work.company} logo`}
                              className='w-full h-full object-contain filter brightness-0 invert opacity-80'
                            />
                          </div>
                        )}

                        <h3 className='text-xl font-light text-white font-didot tracking-wide leading-tight'>
                          {work.company}
                        </h3>

                        {work.location && (
                          <p className='text-sm text-muted-foreground font-light tracking-wider uppercase'>
                            {work.location}
                          </p>
                        )}
                      </CardHeader>
                    </div>

                    {/* Center: Position & Description */}
                    <div className='lg:col-span-2'>
                      <div className='space-y-4'>
                        <div>
                          <p className='text-lg text-white font-light leading-relaxed'>
                            {work.position}
                          </p>

                          <p className='text-gray-300 font-light text-sm tracking-wide mt-1'>
                            {work.startDate} —{' '}
                            {work.isCurrent
                              ? 'Present'
                              : work.endDate || 'Present'}
                          </p>
                        </div>

                        {work.description && (
                          <p className='text-gray-300 font-light leading-relaxed text-sm'>
                            {work.description}
                          </p>
                        )}

                        {/* Technologies */}
                        {work.technologies && work.technologies.length > 0 && (
                          <div className='space-y-2'>
                            <span className='text-xs text-muted-foreground uppercase tracking-wider'>
                              Technologies
                            </span>
                            <div className='flex flex-wrap gap-2'>
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
                          <div className='space-y-2'>
                            <span className='text-xs text-muted-foreground uppercase tracking-wider'>
                              Key Learnings
                            </span>
                            <div className='flex flex-wrap gap-2'>
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

                    {/* Right: Status */}
                    <div className='lg:col-span-1 lg:text-right'>
                      <div className='space-y-3'>
                        {work.isCurrent && (
                          <Badge
                            variant='outline'
                            className='text-white border-white/20 bg-white/5 hover:bg-white/10 font-light tracking-wider'
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
              {index < workExperience.length - 1 && (
                <div className='my-16'>
                  <Separator className='bg-white/10' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
