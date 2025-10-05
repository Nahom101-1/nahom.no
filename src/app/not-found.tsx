'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CurrentlyPlaying from '@/components/features/CurrentlyPlaying';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-black/95'>
      <Card className='w-full max-w-2xl bg-black/40 border-gray-800'>
        <CardHeader>
          <CardTitle className='text-4xl font-bold text-center text-white'>
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <p className='text-gray-400 text-center text-lg'>
            This page doesn't exist or is under construction.
          </p>
          <Separator className='bg-gray-800' />
          <div className='flex justify-center'>
            <div className='w-full max-w-md'>
              <p className='text-gray-400 text-center mb-4'>
                While you're here, check out what I'm listening to:
              </p>
              <CurrentlyPlaying />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
