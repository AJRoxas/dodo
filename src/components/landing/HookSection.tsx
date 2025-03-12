'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const HookSection = () => {
  const router = useRouter();

  return (
    <div className="container-col gap-2 motion-safe:animate-fade-up">
      <div className="font-semibold text-4xl sm:text-6xl">Your Grades</div>
      <div className="font-semibold text-4xl sm:text-6xl text-gradient">
        Simplified
      </div>
      <div className="max-w-75 text-center">
        Record, analyze, and improve with dodo&apos;s grade tracker and insights
      </div>
      <Button onClick={() => router.push('/sign-in')}>Get Started</Button>
    </div>
  );
};

export default HookSection;
