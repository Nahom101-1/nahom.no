'use client';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function NotFound() {
  return (
    <div className='fixed inset-0 w-screen h-screen bg-black overflow-hidden'>
      <AnimatedBackground
        auroraColors={['#00D8FF', '#427F39', '#00D8FF']}
        auroraAmplitude={2.5}
        auroraBlend={0.6}
        auroraSpeed={0.5}
        auroraMidPoint={0.05}
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center'>
        <h1 className='text-4xl font-bold'>404 - Page Not Found 🙅🏾‍♂️</h1>
        <p className='mt-4'>
          This page either does not exist or is under construction or you typed
          the wrong path in the url. 😛
        </p>
      </div>
    </div>
  );
}
