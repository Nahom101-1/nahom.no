'use client';
import { Navbar } from '@/components/layout/navbar';
import SplitText from '@/components/effects/SplitText';
import WatchedRecently from '@/components/features/watchedRecently';
export default function AboutPage() {
  return (
    <div className='relative min-h-[100dvh] w-full bg-black text-white overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black' />

      <Navbar />
      <WatchedRecently />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4'>
        {/* Main Title */}
        <div className='mb-8'>
          <SplitText
            text='ABOUT ME'
            className='text-5xl md:text-7xl font-bold text-center tracking-tight'
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

        {/* Coming Soon Text */}
        <div className='text-center'>
          <SplitText
            text='Coming Soon'
            className='text-2xl md:text-3xl font-light text-gray-400 tracking-widest'
            delay={400}
            duration={0.8}
            ease='power2.out'
            splitType='chars'
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin='-100px'
          />
        </div>

        {/* Decorative Line */}
        <div className='mt-12 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
      </div>
    </div>
  );
}
