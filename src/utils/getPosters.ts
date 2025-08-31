import { Poster } from '@/types/sanity';
import { urlFor } from './imageUrlBuilder';
import { client } from '@/sanity/lib/client';

// Query for all background posters
const POSTER_QUERY = `*[_type == "backGroundPoster"]{ _id, poster,image}`;

export async function getPosters(): Promise<Poster[]> {
  const posts = await client.fetch<Poster[]>(POSTER_QUERY);

  return posts.map(post => ({
    ...post,
    imageUrl:
      post.image && post.image.asset?._ref
        ? urlFor(post.image)
        : '/placeholder.jpg',
  }));
}
