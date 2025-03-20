import { z } from 'zod';
import { Scale } from '@@/types';

// UseSettings inputs, GpaScales grade and gpa input
const nonnegativeInput = z.number().nonnegative().safe();
// GpaScales letter input
const gpaLetter = z.string().trim().min(1).max(3);

const userSetting = z.object({
  required_credits: nonnegativeInput,
  final_gpa_goal: nonnegativeInput,
  initial_credits: nonnegativeInput,
  initial_gpa: nonnegativeInput,
});

const gpaGrade = z.object({
  letter: gpaLetter,
  gpa: nonnegativeInput,
  grade: nonnegativeInput.max(100),
});

export const validateUserSetting = (userSettingForm: {
  required_credits: number;
  final_gpa_goal: number;
  initial_credits: number;
  initial_gpa: number;
}) => {
  const result = userSetting.safeParse(userSettingForm);
  return result.success;
};

export const validateGpaScale = (gpaScale: Scale[]) => {
  let result = gpaScale.every((everyGrade, i, scale) => {
    return (
      gpaGrade.safeParse({
        letter: everyGrade.letter,
        gpa: everyGrade.gpa,
        grade: everyGrade.grade,
      }).success &&
      scale.findIndex((findGrade) => findGrade.letter == everyGrade.letter) ==
        i &&
      scale.findIndex((findGrade) => findGrade.grade == everyGrade.grade) == i
    );
  });

  return result;
};
