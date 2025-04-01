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
import { getUserSetting } from './lib/prisma/queries/userSettings';
import { cookies } from 'next/headers';

const PUBLIC_PATHS = ['/', '/sign-in'];
const ONBOARDED_PATHS = ['/courses'];
const ONBOARDING_PATHS = ['/getting-started'];

export async function middleware(request: NextRequest) {
  // Used to validate if the user is onboarded
  const cookieStore = await cookies();

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
      // Used to validate if the user is
      if (!cookieStore.get('isOnboarded')?.value) {
        console.info('Onboard must be checked!')
        const userSetting = await getUserSetting(decodedToken.uid);
        if (userSetting) {
          cookieStore.set('isOnboarded', 'true', { maxAge: 12 * 60 * 60 * 24 });
        }
      }

      const isOnboarded = cookieStore.get('isOnboarded')?.value;

      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        const location = isOnboarded ? '/courses' : '/getting-started';
        return redirectToPath(request, location, {
          shouldClearSearchParams: true,
        });
      } else if (
        !isOnboarded &&
        ONBOARDED_PATHS.includes(request.nextUrl.pathname)
      ) {
        return redirectToPath(request, '/getting-started', {
          shouldClearSearchParams: true,
        });
      } else if (
        isOnboarded &&
        ONBOARDING_PATHS.includes(request.nextUrl.pathname)
      ) {
        return redirectToPath(request, '/courses', {
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
      if (cookieStore.get('isOnboarded')?.value) {
        console.info('Onboard must be removed!')
        cookieStore.delete('isOnboarded');
      }
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
