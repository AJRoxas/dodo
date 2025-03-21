import { deleteUser } from '@/lib/prisma/queries/users';
import { validateToken } from '@/lib/auth/serverAuth';
import { apiTryCatch } from '@/lib/utils/tryCatchWrappers';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return await apiTryCatch(async () => {
    const unAuthenticated = await validateToken(request.cookies);
    if (unAuthenticated) return unAuthenticated;

    const { id } = await params;
    const user = await deleteUser(id);

    if (user.error !== undefined) {
      NextResponse.json(user, { status: 208 });
    }

    return NextResponse.json({ status: 204 });
  });
}
