import { getUserSetting } from '@/lib/prisma/queries/userSettings';
import { validateToken } from '@/lib/auth/serverAuth';
import { apiTryCatch } from '@/lib/utils/tryCatchWrappers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return await apiTryCatch(async () => {
    const unAuthenticated = await validateToken(request.cookies);
    if (unAuthenticated) return unAuthenticated;

    const { id } = await params;
    const user = await getUserSetting(id);

    return NextResponse.json(user, { status: 200 });
  });
}
