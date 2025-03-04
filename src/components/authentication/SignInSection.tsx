'use client';

import Button from '@/components/Button';
import app from '@/lib/firebase/firebase';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMask } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

const redirectToDashboard = (router: AppRouterInstance) => {
  router.push('/getting-started');
};

const handleAnonymousSignIn = async (router: AppRouterInstance) => {
  try {
    const credentials = await signInAnonymously(getAuth(app));
    const idToken = await credentials.user.getIdToken();

    await fetch("/api/login", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    redirectToDashboard(router);
  } catch (error) {
    console.log((error as Error).message);
  }
};

const SignInSection = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 motion-safe:animate-fade-left">
        <Button size="md" icon={faGoogle} onClick={() => {}}>
          Continue with Google
        </Button>
        <Button size="md" icon={faGithub} onClick={() => {}}>
          Continue with GitHub
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 motion-safe:animate-fade-left">
        <div className="font-semibold text-center text-sm">
          Just vising? Demo the project by signing anonymously
        </div>
        <Button
          size="md"
          icon={faMask}
          onClick={() => {
            handleAnonymousSignIn(router);
          }}
        >
          Enter Anonymously
        </Button>
      </div>
    </>
  );
};

export default SignInSection;
