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
