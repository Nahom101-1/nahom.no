import { type Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import HeroSection from '@/components/features/HeroSection';
import MarqueeStrip from '@/components/features/MarqueeStrip';
import AboutSection from '@/components/features/AboutSection';
import WorkSection from '@/components/features/WorkSection';
import ExperienceSection from '@/components/features/ExperienceSection';
import ToolkitSection from '@/components/features/ToolkitSection';
import EducationSection from '@/components/features/EducationSection';
import OffTheClock from '@/components/features/OffTheClock';
import ContactSection from '@/components/features/ContactSection';
import FooterSection from '@/components/features/FooterSection';
import {
  getProjects,
  getWorkExperience,
  getEducation,
  getSiteSettings,
  getResume,
} from '@/lib/sanity';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  return {
    title: { absolute: settings?.name ?? 'Nahom Berhane' },
    description:
      settings?.metaDescription ??
      'Backend and AI-leaning developer building the quiet infrastructure behind useful software.',
  };
}

export default async function Home() {
  const [projects, experience, educationList, settings, resume] = await Promise.all([
    getProjects().catch(() => []),
    getWorkExperience().catch(() => []),
    getEducation().catch(() => []),
    getSiteSettings().catch(() => null),
    getResume().catch(() => null),
  ]);

  const education = educationList[0] ?? null;

  return (
    <>
      <Navbar
        settings={settings}
        resumeUrl={resume?.url}
        resumeNoUrl={resume?.urlNo}
      />

      <main>
        <HeroSection settings={settings} />
        <MarqueeStrip words={settings?.marqueeWords} />
        <AboutSection settings={settings} />
        <WorkSection projects={projects} settings={settings} />
        <ExperienceSection experience={experience} settings={settings} />
        <ToolkitSection settings={settings} />
        <EducationSection
          education={education}
          languages={settings?.languages}
          settings={settings}
        />
        {settings?.offClockEnabled !== false && <OffTheClock settings={settings} />}
        <ContactSection
          settings={settings}
          resumeUrl={resume?.url}
          resumeNoUrl={resume?.urlNo}
        />
      </main>

      <FooterSection settings={settings} />
    </>
  );
}
