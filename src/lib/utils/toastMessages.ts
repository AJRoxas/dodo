import { ShowToastProps } from '@/components/ToastWrapper';

// When form fails in zod (usually non-malicious)
export const invalidFormMessage: ShowToastProps = {
  title: 'Invalid Form',
  description: 'Please check your form and try again.',
  type: 'error',
};

// When form fails from usually malicious client changes
export const unexpectedFormChangeMessage: ShowToastProps = {
  title: 'Unexpected Form Change Detected',
  description: 'Try refreshing the page.',
  type: 'error',
};

// When something fails on back-end
export const serverErrorMessage: ShowToastProps = {
  title: 'Server Error',
  description: 'Your information was not saved, please refresh and try again.',
  type: 'error',
};

// When something fails on back-end because it is not unique
export const serverErrorUniquenessMessage: (value: string) => ShowToastProps = (
  extraMessage: string
) => {
  return {
    title: 'This record already exists',
    description: extraMessage,
    type: 'error',
  };
};

// When getting started page called fetch successfully
export const successGettingStartedMessage: ShowToastProps = {
  title: 'Success',
  description: 'Your settings have been saved!',
  type: 'success',
};

// When add course form called fetch successfully
export const successAddCourseMessage: ShowToastProps = {
  title: 'Success',
  description: 'Your course was added successfully!',
  type: 'success',
};
