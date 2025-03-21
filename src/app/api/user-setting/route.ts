import { createUserSetting } from '@/lib/prisma/queries/userSettings';
import { validateToken } from '@/lib/auth/serverAuth';
import { apiTryCatch } from '@/lib/utils/tryCatchWrappers';
import { NextRequest, NextResponse } from 'next/server';

// Should be in /user-setting/[id]
// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   return await apiTryCatch(async () => {
//     const unAuthenticated = await validateToken(request.cookies);
//     if (unAuthenticated) return unAuthenticated;

//     const { id } = await params;
//     const user = await getUserSetting(id);

//     return NextResponse.json(user, { status: 200 });
//   });
// }

export async function POST(request: NextRequest) {
  return await apiTryCatch(async () => {
    const unAuthenticated = await validateToken(request.cookies);
    if (unAuthenticated) return unAuthenticated;

    const body = await request.json();
    const userSetting = await createUserSetting({
      user_id: body.user_id,
      required_credits: body.required_credits,
      final_gpa_goal: body.final_gpa_goal,
      initial_credits: body.initial_credits,
      initial_gpa: body.initial_gpa,
      gpa_scale: body.gpa_scale
    });

    if (userSetting.error !== undefined) {
      return NextResponse.json(userSetting, { status: 208 });
    }

    return NextResponse.json(userSetting, { status: 201 });
  });
}
