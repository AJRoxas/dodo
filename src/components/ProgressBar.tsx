'use client';

import { Progress } from 'radix-ui';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percent: number;
  className?: string;
}

const ProgressBar = ({ percent, className }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percent), 100);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <Progress.Root className={`w-full rounded-lg bg-highlight relative overflow-hidden translate-z-0 ${className}`} value={progress}>
      <Progress.Indicator
        className={`w-full h-full transition-transform duration-600 ease-in-out bg-primary`}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
