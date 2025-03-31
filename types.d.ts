/* Common Validations:
 * "valueMissing"
 * "badInput"
 * "patternMismatch"
 * "rangeOverflow"
 * "rangeUnderflow"
 * "stepMismatch"
 * "tooLong"
 * "tooShort"
 * "typeMismatch"
 * "valid"
 */
// Common Validations

import { assessments, courses, coursetags } from '@prisma/client';

export type InputValidation = {
  validation: ValidityMatcher | CustomMatcher;
  message: string;
};

export type GpaScaleEntry = {
  id: number;
  letter?: string;
  gpa?: number;
  grade?: number;
};

export type CourseWithTags = courses & {
  coursetags: coursetags[];
};

export type CourseWithAssessments = CourseWithTags & {
  assessments: assessments[];
};

export type CourseWithStats = CourseWithAssessments & {
  mark?: number;
  progress?: number;
  gpaEntry?: GpaScaleEntry;
};
