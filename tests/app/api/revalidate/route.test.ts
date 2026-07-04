import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { revalidatePath, isValidSignature } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  isValidSignature: vi.fn(),
}));

vi.mock('next/cache', () => ({ revalidatePath }));
vi.mock('@sanity/webhook', () => ({
  isValidSignature,
  SIGNATURE_HEADER_NAME: 'sanity-webhook-signature',
}));

import { POST } from '@/app/api/revalidate/route';

describe('POST /api/revalidate', () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env, SANITY_REVALIDATE_SECRET: 'test-secret' };
    revalidatePath.mockReset();
    isValidSignature.mockReset();
  });

  afterEach(() => {
    process.env = env;
  });

  it('returns 501 when secret is not configured', async () => {
    delete process.env.SANITY_REVALIDATE_SECRET;
    const res = await POST(
      new Request('http://localhost/api/revalidate', {
        method: 'POST',
        body: '{}',
      })
    );
    expect(res.status).toBe(501);
  });

  it('returns 401 when signature is invalid', async () => {
    isValidSignature.mockReturnValue(false);
    const res = await POST(
      new Request('http://localhost/api/revalidate', {
        method: 'POST',
        body: '{}',
        headers: { 'sanity-webhook-signature': 'bad' },
      })
    );
    expect(res.status).toBe(401);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it('revalidates the home page on valid webhook', async () => {
    isValidSignature.mockReturnValue(true);
    const res = await POST(
      new Request('http://localhost/api/revalidate', {
        method: 'POST',
        body: '{"_type":"siteSettings"}',
        headers: { 'sanity-webhook-signature': 'valid' },
      })
    );
    expect(res.status).toBe(200);
    expect(revalidatePath).toHaveBeenCalledWith('/');
    await expect(res.json()).resolves.toMatchObject({ revalidated: true });
  });
});
