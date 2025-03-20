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
// 
export type InputValidation = {
  validation: ValidityMatcher | CustomMatcher;
  message: string;
};

export type Scale = {
  id: number;
  user_id?: string;
  letter?: string;
  gpa?: number;
  grade?: number;
};
