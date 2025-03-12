'use server';

import { NextResponse } from 'next/server';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { retrieveTokens } from './token';

export const validateToken = async (cookies: RequestCookies) => {
  const tokens = await retrieveTokens(cookies);

  if (tokens) {
    return null;
  }

  return NextResponse.json(
    { error: 'Unauthorized user! Only authorized users can use this API.' },
    { status: 401 }
  );
};
