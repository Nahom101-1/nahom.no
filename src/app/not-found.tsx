'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CurrentlyPlaying from '@/components/features/CurrentlyPlaying';

export default function NotFound() {
  return (
    <div className='min-h-[100dvh] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/95'>
      <Card className='w-[95%] sm:w-[90%] md:w-full max-w-3xl md:max-w-4xl lg:max-w-5xl bg-black/40 border-gray-800'>
        <CardHeader>
          <CardTitle className='text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white'>
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center'>
          <p className='text-gray-400 text-center text-base sm:text-lg'>
            This page doesn&apos;t exist or is under construction.
          </p>
          <Separator className='bg-gray-800' />
          <div className='flex justify-center'>
            <div className='w-full'>
              <p className='text-gray-400 text-center mb-4 text-sm sm:text-base'>
                While you&apos;re here, check out what I&apos;m listening to:
              </p>
              <div className='transform scale-100 sm:scale-110 md:scale-125 lg:scale-150 origin-center'>
                <CurrentlyPlaying />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
