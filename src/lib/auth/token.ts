'use server';

import { NextRequest } from 'next/server';
import { getTokens } from 'next-firebase-auth-edge';
import {
  firebaseClientConfig,
  firebaseServerConfig,
} from '@/lib/firebase/config';
import { cookies } from 'next/headers';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const retrieveTokens = async (
  cookies: RequestCookies | ReadonlyRequestCookies
) => {
  return await getTokens(cookies, {
    apiKey: firebaseClientConfig.apiKey,
    cookieName: firebaseServerConfig.cookieName,
    cookieSignatureKeys: firebaseServerConfig.cookieSignatureKeys,
    serviceAccount: firebaseServerConfig.serviceAccount,
  });
};
