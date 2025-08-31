import { Education } from '@/types/sanity';
import { urlFor } from './imageUrlBuilder';
import { client } from '@/sanity/lib/client';
import groq from 'groq';

const EDUCATION_QUERY = groq`*[_type == "education"]{
  _id,
  _type,
  picture,
  institution,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
  isCurrent,
  gpa,
  location,
  institutionLogo
}`;

export async function getEducation(): Promise<Education[]> {
  const docs = await client.fetch<Education[]>(EDUCATION_QUERY);
  return docs.map(education => ({
    ...education,
    imageUrl: education.picture?.asset?._ref
      ? urlFor(education.picture)
      : '/placeholder.jpg',
  }));
}
