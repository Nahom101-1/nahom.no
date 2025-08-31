import { HeroSection } from '@/components';
import { getPosters } from '@/utils/getPosters';

export default async function Home() {
  const posters = await getPosters();
  return <HeroSection posters={posters} />;
}
