import { getEducation } from '@/lib/sanity';
import EducationSection from '@/components/features/Education';

export default async function EducationPage() {
  const education = await getEducation();
  return (
    <>
      <EducationSection education={education} />
    </>
  );
}
