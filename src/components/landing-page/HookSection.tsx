'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation'

const HookSection = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-2 p-10 sm:p-20">
      <div className="font-semibold text-4xl sm:text-6xl">Your Grades</div>
      <div className="font-semibold text-4xl sm:text-6xl text-gradient">Simplified</div>
      <div className="max-w-xs text-center">
        Record, analyze, and improve with dodo&apos;s grade tracker and insights
      </div>
      <Button onClick={() => router.push('/sign-up') }>Get Started</Button>
    </div>
  );
};

export default HookSection;
