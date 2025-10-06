import HeroSection from '@/components/layout/Hero';
import { getPosters } from '@/lib/sanity';

export default async function Home() {
  const posters = await getPosters();

  return (
    <>
      <HeroSection posters={posters} />
    </>
  );
}
