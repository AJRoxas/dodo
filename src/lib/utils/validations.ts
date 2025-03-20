import { GpaScaleEntry } from '@@/types';
import { usersettings } from '@prisma/client';
import { z } from 'zod';

// UseSettings inputs, GpaScales grade and gpa input
const nonnegativeInput = z.number().nonnegative().safe();
// GpaScales letter input
const gpaLetter = z.string().trim().min(1).max(3);

const academicGoals = z.object({
  required_credits: nonnegativeInput,
  final_gpa_goal: nonnegativeInput,
  initial_credits: nonnegativeInput,
  initial_gpa: nonnegativeInput,
});

const gpaGrade = z.object({
  letter: gpaLetter,
  gpa: nonnegativeInput,
  grade: nonnegativeInput,
});

export const validateAcademicGoals = ({
  required_credits,
  final_gpa_goal,
  initial_credits,
  initial_gpa,
}: usersettings) => {
  const result = academicGoals.safeParse({
    required_credits,
    final_gpa_goal,
    initial_credits,
    initial_gpa,
  });
  return result.success;
};

export const validateGpaScaleLetters = (gpaScale: GpaScaleEntry[]) => {
  console.log('Called')
  let result = gpaScale.every((everyEntry, i, scale) => {
    return (
      gpaLetter.safeParse(everyEntry.letter).success &&
      scale.findIndex((findEntry) => findEntry.letter == everyEntry.letter) == i
    );
  });

  return result;
};

export const validateGpaScaleGpas = (gpaScale: GpaScaleEntry[]) => {
  let result = gpaScale.every((everyEntry) => {
    return nonnegativeInput.safeParse(everyEntry.gpa).success;
  });

  return result;
};

export const validateGpaScaleGrades = (gpaScale: GpaScaleEntry[]) => {
  let result = gpaScale.every((everyEntry, i, scale) => {
    return (
      nonnegativeInput.safeParse(everyEntry.grade).success &&
      scale.findIndex((findEntry) => findEntry.grade == everyEntry.grade) == i
    );
  });

  return result;
};

export const validateGpaScaleHasFailingGrade = (gpaScale: GpaScaleEntry[]) => {
  let result = gpaScale.findIndex((findEntry) => findEntry.grade == 0) > 0;

  return result;
};

export const validateGpaScale = (gpaScale: GpaScaleEntry[]) => {
  let result = gpaScale.every((everyEntry, i, scale) => {
    return (
      gpaGrade.safeParse({
        letter: everyEntry.letter,
        gpa: everyEntry.gpa,
        grade: everyEntry.grade,
      }).success &&
      scale.findIndex((findEntry) => findEntry.letter == everyEntry.letter) ==
        i &&
      scale.findIndex((findEntry) => findEntry.grade == everyEntry.grade) ==
        i &&
      scale.findIndex((findEntry) => findEntry.grade == 0) > 0
    );
  });

  return result;
};

export const validateUserSettings = (
  {
    required_credits,
    final_gpa_goal,
    initial_credits,
    initial_gpa,
  }: usersettings,
  gpaScale: GpaScaleEntry[]
) => {
  return (
    validateAcademicGoals({
      required_credits,
      final_gpa_goal,
      initial_credits,
      initial_gpa,
    } as usersettings) && validateGpaScale(gpaScale)
  );
};
