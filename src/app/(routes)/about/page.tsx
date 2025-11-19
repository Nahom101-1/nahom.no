import Image from 'next/image';
import { getPicAboutMePage } from '@/lib/sanity';
import Link from 'next/link';

export default async function AboutPage() {
  const { babyPic, oldNahomPic } = await getPicAboutMePage();
  return (
    <div className='min-h-screen bg-gray-100 text-black font-mono'>
      <div className='max-w-4xl mx-auto p-4'>
        {/* Header with classic web styling */}
        <div className='bg-blue-900 text-white p-4 mb-4 border-4 border-blue-700'>
          <h1 className='text-2xl font-bold text-center'> Abbout Me ✌🏽 </h1>
          <button>
            <Link href='/'>Home</Link>
          </button>
        </div>
        <div className='bg-white border-4 border-gray-400 p-4 mb-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Images */}
            <div className='space-y-2'>
              <div className='border-2 border-gray-400 p-2'>
                <Image
                  src={babyPic}
                  alt='Baby Nahom'
                  width={200}
                  height={200}
                  className='w-full h-auto'
                />
                <p className='text-center text-sm text-gray-600'>Baby Nahom</p>
              </div>
              <div className='border-2 border-gray-400 p-2'>
                <Image
                  src={oldNahomPic}
                  alt='Current Nahom'
                  width={200}
                  height={200}
                  className='w-full h-auto'
                />
                <p className='text-center text-sm text-gray-600'>
                  Current Nahom
                </p>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='bg-yellow-100 border-2 border-yellow-400 p-3'>
                <h3 className='font-bold text-blue-800'>Bio</h3>
                <p className='text-sm'>
                  I&apos;m Nahom, a 20-year-old third-year IT student at NTNU
                  Gjøvik. I&apos;m originally from Eritrea, grew up in
                  Trondheim, and now live in Gjøvik for my studies.
                </p>
              </div>
              <div className='bg-pink-100 border-2 border-pink-400 p-3'>
                <h3 className='font-bold text-purple-800'>Interests</h3>
                <ul className='text-sm list-disc list-inside'>
                  <li>Working out</li>
                  <li>Playing tennis</li>
                  <li>Watching movies at the cinema</li>
                  <li>Technology</li>
                </ul>
              </div>
              <div className='bg-green-100 border-2 border-green-400 p-3'>
                <h3 className='font-bold text-green-800'>Contact</h3>
                <p className='text-sm'>
                  📧{' '}
                  <a
                    href='mailto:nahom@berhane.no'
                    className='text-blue-600 underline'
                  >
                    nahom@berhane.no
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
