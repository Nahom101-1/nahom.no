import HeroSection from '@/components/layout/Hero';
import Education from '@/components/features/Education';
import WorkExperienceSection from '@/components/features/Work';
import { getPosters, getEducation, getWorkExperience } from '@/lib/sanity';

export default async function Home() {
  const posters = await getPosters();
  const education = await getEducation();
  const workExperience = await getWorkExperience();

  return (
    <>
      <HeroSection posters={posters} />
      <Education education={education} />
      <WorkExperienceSection workExperience={workExperience} />
    </>
  );
}
