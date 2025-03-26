import { GpaScaleEntry } from '@@/types';

export const gpaScaleSort = (a: GpaScaleEntry, b: GpaScaleEntry) => {
  if (b === undefined) return -1;
  if (a === undefined) return 1;
  return b.grade! - a.grade!;
};

export const getGpa = (grade: number, gpaScale: GpaScaleEntry[]) => {
  return (
    gpaScale.find((entry) => entry.grade && grade >= entry.grade) ??
    gpaScale.at(-1)
  );
};

export const getFutureGpaRequirements = (
  credits: number,
  cGpa: number,
  requiredCredits: number,
  finalGpaGoal: number
) => {
  return (finalGpaGoal*requiredCredits-cGpa*credits)/(requiredCredits-credits);
};
