import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import groq from 'groq';
import {
  Education,
  Project,
  SiteSettings,
  WorkExperience,
} from '@/types/sanity';
import { buildPortraitUrl } from '@/lib/portrait-url';
// Environment variables
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-31';
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

// Sanity Client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Image URL Builder
const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}

// Queries
const WORK_EXPERIENCE_QUERY = groq`*[_type == "workExperience"] | order(startDate desc) {
  _id,
  _type,
  picture {
    asset->{
      _id,
      url
    }
  },
  company,
  position,
  positionNo,
  location,
  startDate,
  endDate,
  isCurrent,
  badge,
  description,
  descriptionNo,
  technologies,
  learnings,
  learningsNo
}`;

const PROJECT_QUERY = groq`*[_type == "project"] | order(order asc, year desc) {
  _id,
  title,
  year,
  description,
  descriptionNo,
  stack,
  link,
  order,
  "imageUrl": image.asset->url
}`;

const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings" && _id == "siteSettings"][0] {
  name,
  roleLabel,
  roleLabelNo,
  birthDate,
  tagline,
  taglineNo,
  portfolioIndex,
  portfolioIndexNo,
  metaDescription,
  metaDescriptionNo,
  heroHighlights,
  aboutHeading,
  aboutSubheading,
  aboutHeadingNo,
  aboutSubheadingNo,
  aboutText,
  aboutTextNo,
  portrait,
  languages,
  toolkitHeading,
  toolkitSubtitle,
  toolkitHeadingNo,
  toolkitSubtitleNo,
  skillGroups,
  marqueeWords,
  email,
  githubUrl,
  linkedinUrl,
  websiteUrl,
  contactKicker,
  contactHeading,
  contactKickerNo,
  contactHeadingNo,
  emailMeLabel,
  emailMeLabelNo,
  resumeEnLabel,
  resumeEnLabelNo,
  resumeNoLabel,
  resumeNoLabelNo,
  footerNote,
  offClockEnabled,
  offClockHeading,
  offClockHeadingNo,
  offClockKicker,
  offClockKickerNo,
  nowPlayingLabel,
  nowPlayingLabelNo,
  nothingPlayingLabel,
  nothingPlayingLabelNo,
  nothingPlayingSub,
  nothingPlayingSubNo,
  recentlyWatchedLabel,
  recentlyWatchedLabelNo,
  navWork,
  navWorkNo,
  navExperience,
  navExperienceNo,
  navAbout,
  navAboutNo,
  navContact,
  navContactNo,
  resumeNavLabel,
  resumeNavLabelNo,
  sayHelloNavLabel,
  sayHelloNavLabelNo,
  workHeading,
  workSubheading,
  workHeadingNo,
  workSubheadingNo,
  experienceHeading,
  experienceSubheading,
  experienceHeadingNo,
  experienceSubheadingNo,
  educationHeading,
  educationSubheading,
  educationHeadingNo,
  educationSubheadingNo,
  languagesHeading,
  languagesHeadingNo,
  presentLabel,
  presentLabelNo,
  gradeLabel,
  gradeLabelNo
}`;

const EDUCATION_QUERY = groq`*[_type == "education"] | order(startDate desc) {
  _id, _type, picture, institution, degree, degreeNo,
  fieldOfStudy, fieldOfStudyNo, startDate, endDate, isCurrent,
  gpa, location, institutionLogo,
  "relevantClasses": *[_type == "relevantClasses" && references(^._id)] {
    _id, courseCode, courseName, courseNameNo, grade, year
  }
}`;

// Data fetching functions
export async function getWorkExperience(): Promise<WorkExperience[]> {
  const docs = await client.fetch<WorkExperience[]>(WORK_EXPERIENCE_QUERY);
  return docs.map(work => ({
    ...work,
    imageUrl: work.picture?.asset?._ref
      ? urlFor(work.picture)
      : '/placeholder.jpg',
  }));
}

export async function getEducation(): Promise<Education[]> {
  const docs = await client.fetch<Education[]>(EDUCATION_QUERY);
  return docs.map(education => ({
    ...education,
    imageUrl: education.picture?.asset?._ref
      ? urlFor(education.picture)
      : '/placeholder.jpg',
  }));
}

export async function getResume(): Promise<{
  url: string;
  label: string;
  urlNo?: string;
  labelNo?: string;
} | null> {
  const result = await client.fetch<{
    url: string;
    label: string;
    urlNo?: string;
    labelNo?: string;
  } | null>(
    groq`*[_type == "resume"][0] { "url": file.asset->url, label, "urlNo": fileNo.asset->url, labelNo }`
  );
  return result ?? null;
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(PROJECT_QUERY);
}

function portraitUrlFrom(
  portrait?: SanityImageSource | null
): string | undefined {
  return buildPortraitUrl(portrait, source =>
    builder
      .image(source)
      .width(480)
      .height(600)
      .fit('crop')
      .auto('format')
      .url()
  );
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const settings = await client
    .withConfig({ useCdn: false })
    .fetch<(SiteSettings & { portrait?: SanityImageSource }) | null>(
      SITE_SETTINGS_QUERY,
      {},
      { next: { revalidate: 3600 } }
    );

  if (!settings) return null;

  const { portrait, ...rest } = settings;
  return {
    ...rest,
    portraitUrl: portraitUrlFrom(portrait),
  };
}

// Utility function for environment variables
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
