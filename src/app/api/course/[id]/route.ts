import { validateToken } from '@/lib/auth/serverAuth';
import { apiTryCatch } from '@/lib/utils/tryCatchWrappers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteCourse } from '@/lib/prisma/queries/course';
import { revalidateTag } from 'next/cache';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  return await apiTryCatch(async () => {
    const unAuthenticated = await validateToken(request.cookies);
    if (unAuthenticated) return unAuthenticated;

    const { id } = await params;

    console.log(id)
    
    const course = await deleteCourse(id);

    if (course.error !== undefined) {
      return NextResponse.json(course, { status: 400 });
    }

    revalidateTag('dashboard');
    return NextResponse.json(course, { status: 201 });
  });
}
