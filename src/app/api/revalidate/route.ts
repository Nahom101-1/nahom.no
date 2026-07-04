import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'Not configured' }, { status: 501 });
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature || !isValidSignature(body, signature, secret)) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  revalidatePath('/');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
