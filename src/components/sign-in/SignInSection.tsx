'use client';

import Button from '@/components/Button';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMask } from '@fortawesome/free-solid-svg-icons';
import {
  signInUserAnonymously,
  signInUserUsingGitHub,
  signInUserUsingGoogle,
} from '@/lib/auth/clientAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@@/public/dodo-icon.svg';

const SignInSection = () => {
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);

  const signIn = async (signInFn: () => Promise<boolean>) => {
    if (await signInFn()) {
      router.replace('/courses');
    }
  };

  return (
    <div className="flex flex-col w-75 gap-8">
      <div className="flex flex-col justify-center items-center motion-safe:animate-fade-left">
        <Icon
          className={`h-16 w-fit fill-primary ${
            signingIn ? 'motion-safe:animate-infinite motion-safe:animate-wiggle-more' : undefined
          }`}
        ></Icon>
        <div className="font-semibold text-3xl text-primary">
          Sign in to dodo
        </div>
        <div className="font-semibold text-sm text-center mt-1">
          Don&apos;t have an account? Continue and we&apos;ll create one for
          you!
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 motion-safe:animate-fade-left">
        <Button
          size="md"
          icon={faGoogle}
          onClick={() => {
            setSigningIn(true);
            signIn(signInUserUsingGoogle);
          }}
        >
          Continue with Google
        </Button>
        <Button
          size="md"
          icon={faGithub}
          onClick={() => {
            setSigningIn(true);
            signIn(signInUserUsingGitHub);
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
            setSigningIn(true);
            signIn(signInUserAnonymously);
          }}
        >
          Enter Anonymously
        </Button>
      </div>
    </div>
  );
};

export default SignInSection;
