import { NextRequest, NextResponse } from 'next/server';
import {
  authMiddleware,
  redirectToLogin,
  redirectToPath,
} from 'next-firebase-auth-edge';
import {
  firebaseServerConfig,
  firebaseClientConfig,
} from '@/lib/firebase/config';

const PUBLIC_PATHS = ['/', '/sign-in'];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: firebaseClientConfig.apiKey,
    cookieName: firebaseServerConfig.cookieName,
    cookieSignatureKeys: firebaseServerConfig.cookieSignatureKeys,
    cookieSerializeOptions: firebaseServerConfig.cookieSerializeOptions,
    serviceAccount: firebaseServerConfig.serviceAccount,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleValidToken: async ({ token, decodedToken }, headers) => {
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToPath(request, '/getting-started', {
          shouldClearSearchParams: true,
        });
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason });

      return redirectToLogin(request, {
        path: '/sign-in',
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });

      return redirectToLogin(request, {
        path: '/sign-in',
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
};
