import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export function hasPortraitAsset(portrait?: unknown): boolean {
  if (!portrait || typeof portrait !== 'object') return false;
  const asset = (
    portrait as { asset?: { _ref?: string; _id?: string; url?: string } }
  ).asset;
  return Boolean(asset?._ref || asset?._id || asset?.url);
}

export function buildPortraitUrl(
  portrait: unknown,
  build: (source: SanityImageSource) => string
): string | undefined {
  if (!hasPortraitAsset(portrait)) return undefined;
  return build(portrait as SanityImageSource);
}
