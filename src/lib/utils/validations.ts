import { z } from 'zod';

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

export const validateUserSetting = (userSettingForm: {
  required_credits: number;
  final_gpa_goal: number;
  initial_credits: number;
  initial_gpa: number;
}) => {
  const result = userSetting.safeParse(userSettingForm);
  return result;
};
