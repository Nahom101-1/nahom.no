import { beforeEach, describe, expect, it, vi } from 'vitest';

const { fetchMock } = vi.hoisted(() => ({
  fetchMock: vi.fn(),
}));

vi.mock('next-sanity', () => ({
  createClient: () => ({
    fetch: fetchMock,
    withConfig: () => ({ fetch: fetchMock }),
  }),
}));

vi.mock('@sanity/image-url', () => ({
  default: () => ({
    image: () => ({
      width: () => ({
        height: () => ({
          fit: () => ({
            auto: () => ({
              url: () => 'https://cdn.sanity.io/portrait.jpg',
            }),
          }),
        }),
      }),
    }),
  }),
}));

import { getProjects, getSiteSettings } from '@/lib/sanity';

describe('sanity data fetchers', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it('getProjects returns fetched projects', async () => {
    fetchMock.mockResolvedValue([{ _id: 'p1', title: 'Project' }]);
    await expect(getProjects()).resolves.toEqual([
      { _id: 'p1', title: 'Project' },
    ]);
  });

  it('getSiteSettings resolves portrait url', async () => {
    fetchMock.mockResolvedValue({
      name: 'Nahom Berhane',
      portrait: { asset: { _ref: 'image-1' } },
    });

    await expect(getSiteSettings()).resolves.toEqual({
      name: 'Nahom Berhane',
      portraitUrl: 'https://cdn.sanity.io/portrait.jpg',
    });
  });

  it('getSiteSettings returns null when missing', async () => {
    fetchMock.mockResolvedValue(null);
    await expect(getSiteSettings()).resolves.toBeNull();
  });
});
