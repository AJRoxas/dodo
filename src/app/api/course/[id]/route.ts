import { validateToken } from '@/lib/auth/serverAuth';
import { apiTryCatch } from '@/lib/utils/tryCatchWrappers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteCourse, updateCourse } from '@/lib/prisma/queries/course';
import { revalidateTag } from 'next/cache';
import { coursetags } from '@prisma/client';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  return await apiTryCatch(async () => {
    const unAuthenticated = await validateToken(request.cookies);
    if (unAuthenticated) return unAuthenticated;

    const { id } = await params;
    const body = await request.json();
    const course = await updateCourse({
      id: id,
      user_id: body.user_id,
      course_code: body.course_code,
      weight: body.weight,
      goal_grade: body.goal_grade,
      is_pass_fail: body.is_pass_fail,
      year: body.year,
      coursetags: body.coursetags.map((tag: coursetags) => ({
        course_id: Number(id),
        tag_id: tag.tag_id,
      })),
    });

    if (course.error !== undefined) {
      return NextResponse.json(course, { status: 400 });
    }

    revalidateTag('dashboard');
    revalidateTag('courses');
    return NextResponse.json(course, { status: 201 });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  return await apiTryCatch(async () => {
    const unAuthenticated = await validateToken(request.cookies);
    if (unAuthenticated) return unAuthenticated;

    const { id } = await params;
    const course = await deleteCourse(id);

    if (course.error !== undefined) {
      return NextResponse.json(course, { status: 400 });
    }

    revalidateTag('dashboard');
    revalidateTag('courses');
    return NextResponse.json(course, { status: 201 });
  });
}
