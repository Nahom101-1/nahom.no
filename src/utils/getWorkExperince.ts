import { WorkExperience } from '@/types/sanity';
import { urlFor } from './imageUrlBuilder';
import { client } from '@/sanity/lib/client';
import groq from 'groq';

const WORK_EXPERIENCE_QUERY = groq`*[_type == "workExperience"] | order(startDate desc) {
  _id,
  _type,
  picture,
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

export async function getWorkExperience(): Promise<WorkExperience[]> {
  const docs = await client.fetch<WorkExperience[]>(WORK_EXPERIENCE_QUERY);
  return docs.map(work => ({
    ...work,
    imageUrl: work.picture?.asset?._ref
      ? urlFor(work.picture)
      : '/placeholder.jpg',
  }));
}
