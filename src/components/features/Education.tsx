import { type Education } from '@/types/sanity';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function EducationSection({
  education,
}: {
  education: Education[];
}) {
  return (
    <section className='min-h-screen bg-black py-24 px-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='mb-20'>
          <h2 className='text-5xl md:text-6xl font-light tracking-wider text-white font-didot text-center'>
            EDUCATION
          </h2>
        </div>

        {/* Education Entries */}
        <div className='space-y-8'>
          {education.map((edu, index) => (
            <div key={edu._id}>
              <Card className='bg-transparent border-none shadow-none p-0'>
                <CardContent className='p-0'>
                  <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
                    {/* Left: Institution & Logo */}
                    <div className='lg:col-span-1'>
                      <CardHeader className='p-0 space-y-4'>
                        {edu.institutionLogo && (
                          <div className='w-16 h-16 mb-6'>
                            <Image
                              src={edu.imageUrl || '/placeholder.jpg'}
                              alt={`${edu.institution} logo`}
                              width={64}
                              height={64}
                              className='w-full h-full object-contain filter brightness-0 invert opacity-80'
                            />
                          </div>
                        )}

                        <h3 className='text-xl font-light text-white font-didot tracking-wide leading-tight'>
                          {edu.institution}
                        </h3>

                        {edu.location && (
                          <p className='text-sm text-muted-foreground font-light tracking-wider uppercase'>
                            {edu.location}
                          </p>
                        )}
                      </CardHeader>
                    </div>

                    {/* Center: Program Details */}
                    <div className='lg:col-span-1'>
                      <div className='space-y-3'>
                        <p className='text-lg text-white font-light leading-relaxed'>
                          {edu.degree}
                        </p>

                        {edu.fieldOfStudy && (
                          <p className='text-gray-300 font-light italic'>
                            {edu.fieldOfStudy}
                          </p>
                        )}

                        {edu.gpa && (
                          <div className='pt-2'>
                            <span className='text-xs text-muted-foreground uppercase tracking-wider'>
                              GPA
                            </span>
                            <p className='text-white font-light'>
                              {edu.gpa.toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Timeline & Status */}
                    <div className='lg:col-span-1 lg:text-right'>
                      <div className='space-y-3'>
                        <p className='text-gray-300 font-light text-sm tracking-wide'>
                          {edu.startDate} —{' '}
                          {edu.isCurrent ? 'Present' : edu.endDate || 'Present'}
                        </p>

                        {edu.isCurrent && (
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
              {index < education.length - 1 && (
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
