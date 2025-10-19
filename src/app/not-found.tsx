'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen flex items-center justify-center p-4 bg-black/95'>
        <Card className='w-full max-w-2xl bg-black/40 border-gray-800'>
          <CardHeader>
            <CardTitle className='text-3xl md:text-4xl font-bold text-center text-white'>
              404 - Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className='p-6'>
            <p className='text-gray-400 text-center text-lg'>
              This page doesn&apos;t exist or is under construction.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
