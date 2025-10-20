import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import groq from 'groq';
import { Education, Poster, WorkExperience } from '@/types/sanity';
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
  description,
  technologies,
  learnings
}`;

const EDUCATION_QUERY = groq`*[_type == "education"] {
  _id, _type, picture, institution, degree,
  fieldOfStudy, startDate, endDate, isCurrent,
  gpa, location, institutionLogo
}`;

const POSTER_QUERY = groq`*[_type == "backGroundPoster"] { 
  _id, poster, image 
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

export async function getPosters(): Promise<Poster[]> {
  const posts = await client.fetch<Poster[]>(POSTER_QUERY);
  return posts.map(post => ({
    ...post,
    imageUrl: post.image?.asset?._ref ? urlFor(post.image) : '/placeholder.jpg',
  }));
}

export async function getPicAboutMePage(): Promise<{
  babyPic: string;
  oldNahomPic: string;
}> {
  const assets = await client.fetch<Array<{ alt: string; imageUrl: string }>>(
    `*[_type == "picture" && alt in ["BabyPic", "OlderPic"]] {
      alt,
      "imageUrl": url.asset->url
    }`
  );

  const babyPic =
    assets.find(a => a.alt === 'BabyPic')?.imageUrl || '/placeholder.jpg';
  const oldNahomPic =
    assets.find(a => a.alt === 'OlderPic')?.imageUrl || '/placeholder.jpg';

  return { babyPic, oldNahomPic };
}

// Utility function for environment variables
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
