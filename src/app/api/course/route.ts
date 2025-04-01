import { validateToken } from '@/lib/auth/serverAuth';
import { apiTryCatch } from '@/lib/utils/tryCatchWrappers';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { createCourse } from '@/lib/prisma/queries/course';

export async function POST(request: NextRequest) {
  return await apiTryCatch(async () => {
    const unAuthenticated = await validateToken(request.cookies);
    if (unAuthenticated) return unAuthenticated;

    const body = await request.json();
    const course = await createCourse({
      user_id: body.user_id,
      course_code: body.course_code,
      weight: body.weight,
      goal_grade: body.goal_grade,
      is_pass_fail: body.is_pass_fail,
      year: body.year,
      coursetags: body.coursetags
    });

    if (course.error !== undefined) {
      return NextResponse.json(course, { status: 400 });
    }

    revalidateTag('dashboard');
    revalidateTag('courses');
    return NextResponse.json(course, { status: 201 });
  });
}
