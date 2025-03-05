'use client';

import Button from '@/components/Button';
import app from '@/lib/firebase/firebase';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMask } from '@fortawesome/free-solid-svg-icons';
import {
  AuthProvider,
  getAuth,
  signInAnonymously,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const SignInSection = () => {
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  gitHubProvider.setCustomParameters({
    allow_signup: 'false',
  });

  const redirectToDashboard = () => {
    router.push('/getting-started');
  };

  const handleSSO = async (provider: AuthProvider) => {
    try {
      const credentials = await signInWithPopup(getAuth(app), provider);
      const idToken = await credentials.user.getIdToken();

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      redirectToDashboard();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      const credentials = await signInAnonymously(getAuth(app));
      const idToken = await credentials.user.getIdToken();

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      redirectToDashboard();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 motion-safe:animate-fade-left">
        <Button
          size="md"
          icon={faGoogle}
          onClick={() => {
            handleSSO(googleProvider);
          }}
        >
          Continue with Google
        </Button>
        <Button
          size="md"
          icon={faGithub}
          onClick={() => {
            handleSSO(gitHubProvider);
          }}
        >
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
            handleAnonymousSignIn();
          }}
        >
          Enter Anonymously
        </Button>
      </div>
    </>
  );
};

export default SignInSection;
