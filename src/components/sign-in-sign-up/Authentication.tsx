'use client';

import Icon from '@@/public/dodo-icon.svg';
import Button from '../Button';
import Link from 'next/link';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMask } from '@fortawesome/free-solid-svg-icons';

interface AuthenticationProps {
  isSignup: boolean;
}

const Authentication = ({ isSignup }: AuthenticationProps) => {
  return (
    <div
      className="flex flex-col justify-center items-center p-10 sm:p-20 max-w-px-300 min-h-full gap-8"
      data-atr={isSignup}
    >
      <div className="flex flex-col justify-center items-center">
        <Icon className="h-16 w-fit fill-primary"></Icon>
        <div className="font-semibold text-3xl text-primary">
          Sign {isSignup ? 'up' : 'in'} to dodo
        </div>
        <div className="font-semibold text-sm text-center mt-1">
          or you can{' '}
          <Link href={isSignup ? '/sign-in' : '/sign-up'}>
            <u>
              sign{' '}
              {isSignup
                ? 'in to your existing account'
                : 'up for a new account'}
            </u>
          </Link>{' '}
          instead
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Button size="md" icon={faGoogle} onClick={() => {}}>
          Sign {isSignup ? 'up' : 'in'} with Google
        </Button>
        <Button size="md" icon={faGithub} onClick={() => {}}>
          Sign {isSignup ? 'up' : 'in'} with GitHub
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="font-semibold text-center text-sm">
          Just vising? Demo the project by signing anonymously
        </div>
        <Button size="md" icon={faMask} onClick={() => {}}>
          Enter Anonymously
        </Button>
      </div>
    </div>
  );
};

const SignUpSection = () => {
  return <Authentication isSignup={true}></Authentication>;
};

const SignInSection = () => {
  return <Authentication isSignup={false}></Authentication>;
};

export { SignUpSection, SignInSection };
