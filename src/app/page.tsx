import { HeroSection } from '@/components';
import Education from '@/components/education';
import WorkExperienceSection from '@/components/workExperience';
import { getEducation } from '@/utils/getEducation';
import { getPosters } from '@/utils/getPosters';
import { getWorkExperience } from '@/utils/getWorkExperince';

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
