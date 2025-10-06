import { getWorkExperience } from '@/lib/sanity';
import WorkExperienceSection from '@/components/features/Work';

export default async function WorkExperiencePage() {
  const workExperience = await getWorkExperience();
  return (
    <>
      <WorkExperienceSection workExperience={workExperience} />
    </>
  );
}
