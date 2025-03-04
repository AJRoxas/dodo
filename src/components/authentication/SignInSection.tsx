'use client';

import Button from '@/components/Button';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMask } from '@fortawesome/free-solid-svg-icons';

const SignInSection = () => {
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
        <Button size="md" icon={faMask} onClick={() => {}}>
          Enter Anonymously
        </Button>
      </div>
    </>
  );
};

export default SignInSection;
