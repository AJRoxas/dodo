'use server'; 

import { NextRequest, NextResponse } from 'next/server';
import { getTokens } from 'next-firebase-auth-edge';
import {
  firebaseClientConfig,
  firebaseServerConfig,
} from '@/lib/firebase/config';

export const validateToken = async (request: NextRequest) => {
  const tokens = await getTokens(request.cookies, {
    apiKey: firebaseClientConfig.apiKey,
    cookieName: firebaseServerConfig.cookieName,
    cookieSignatureKeys: firebaseServerConfig.cookieSignatureKeys,
    serviceAccount: firebaseServerConfig.serviceAccount,
  });

  if (tokens) {
    return null;
  }

  return NextResponse.json(
    { error: 'Unauthorized user! Only authorized users can use this API.' },
    { status: 401 }
  );
};