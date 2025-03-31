import { GpaScaleEntry } from '@@/types';
import { courses, usersettings } from '@prisma/client';
import { z } from 'zod';

const nonnegativeInput = z.number().nonnegative().safe();
const requiredString = z.string().trim().min(1);

//#region  Getting Started

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
  const result = gpaScale.every((everyEntry, i, scale) => {
    return (
      gpaLetter.safeParse(everyEntry.letter).success &&
      scale.findIndex((findEntry) => findEntry.letter == everyEntry.letter) == i
    );
  });

  return result;
};

export const validateGpaScaleGpas = (gpaScale: GpaScaleEntry[]) => {
  const result = gpaScale.every((everyEntry) => {
    return nonnegativeInput.safeParse(everyEntry.gpa).success;
  });

  return result;
};

export const validateGpaScaleGrades = (gpaScale: GpaScaleEntry[]) => {
  const result = gpaScale.every((everyEntry, i, scale) => {
    return (
      nonnegativeInput.safeParse(everyEntry.grade).success &&
      scale.findIndex((findEntry) => findEntry.grade == everyEntry.grade) == i
    );
  });

  return result;
};

export const validateGpaScaleHasFailingGrade = (gpaScale: GpaScaleEntry[]) => {
  const result = gpaScale.findIndex((findEntry) => findEntry.grade == 0) > 0;

  return result;
};

// Validates the input fields only
export const validateGpaScaleInput = (gpaScale: GpaScaleEntry[]) => {
  const result = gpaScale.every((everyEntry) => {
    return gpaGrade.safeParse({
      letter: everyEntry.letter,
      gpa: everyEntry.gpa,
      grade: everyEntry.grade,
    }).success;
  });

  return result;
};

export const validateGpaScale = (gpaScale: GpaScaleEntry[]) => {
  const result =
    gpaScale.every((everyEntry, i, scale) => {
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
    }) && validateGpaScaleHasFailingGrade(gpaScale);

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

//#endregion

//#region Courses

const course = z.object({
  course_code: requiredString.max(28),
  weight: nonnegativeInput,
  goal_grade: nonnegativeInput,
  is_pass_fail: z.boolean(),
  year: nonnegativeInput.min(1900).max(2999),
});

export const validateCourse = ({
  course_code,
  weight,
  goal_grade,
  is_pass_fail,
  year,
}: courses) => {
  const result = course.safeParse({
    year,
    course_code,
    weight,
    goal_grade,
    is_pass_fail,
  });

  return result.success;
};

//#endregion
