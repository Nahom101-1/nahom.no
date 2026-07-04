import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import groq from 'groq';
import { Education, Project, SiteSettings, WorkExperience } from '@/types/sanity';
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
  location,
  startDate,
  endDate,
  isCurrent,
  badge,
  description,
  technologies,
  learnings
}`;

const PROJECT_QUERY = groq`*[_type == "project"] | order(order asc, year desc) {
  _id,
  title,
  year,
  description,
  stack,
  link,
  order,
  "imageUrl": image.asset->url
}`;

const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  name,
  roleLabel,
  birthDate,
  location,
  tagline,
  heroHighlights,
  aboutText,
  "portraitUrl": portrait.asset->url,
  languages,
  toolkitHeading,
  toolkitSubtitle,
  skillGroups,
  marqueeWords,
  email,
  githubUrl,
  linkedinUrl,
  websiteUrl,
  phone,
  contactKicker,
  contactHeading,
  footerNote,
  offClockEnabled,
  offClockKicker
}`;

const EDUCATION_QUERY = groq`*[_type == "education"] | order(startDate desc) {
  _id, _type, picture, institution, degree,
  fieldOfStudy, startDate, endDate, isCurrent,
  gpa, location, institutionLogo,
  "relevantClasses": *[_type == "relevantClasses" && references(^._id)] {
    _id, courseCode, courseName, grade, year
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

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}

// Utility function for environment variables
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
