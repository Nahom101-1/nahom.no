'use client';

interface Course {
  name: string;
  description?: string;
}

interface CoursesProps {
  courses: Course[];
}

export default function Courses({ courses }: CoursesProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
      {courses.map((course, index) => (
        <div
          key={index}
          className='group relative bg-black/40 backdrop-blur-sm border border-white/10 
                     rounded-xl p-6 hover:border-white/20 transition-all duration-300
                     transform hover:-translate-y-1'
        >
          {/* Glow effect */}
          <div
            className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300 rounded-xl'
          />

          {/* Content */}
          <div className='relative z-10'>
            <h3 className='text-xl font-light text-white mb-2 font-didot tracking-wide'>
              {course.name}
            </h3>
            {course.description && (
              <p className='text-sm text-gray-400 font-light leading-relaxed'>
                {course.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
