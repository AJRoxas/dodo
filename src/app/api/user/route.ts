import { createUser } from '@/lib/prisma/queries/users';
import { validateToken } from '@/lib/auth/serverAuth';
import { apiTryCatch } from '@/lib/utils/tryCatchWrappers';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  return await apiTryCatch(async () => {
    const unAuthenticated = await validateToken(request.cookies);
    if (unAuthenticated) return unAuthenticated;

    const body = await request.json();
    const user = await createUser({
      id: body.id,
      email: body.email,
      is_anon: body.is_anon,
    });

    if (user.error !== undefined) {
      revalidateTag('dashboard');
      return NextResponse.json(user, { status: 208 });
    }

    revalidateTag('dashboard');
    return NextResponse.json(user, { status: 201 });
  });
}
