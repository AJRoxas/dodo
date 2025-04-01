import { ShowToastProps } from '@/context/ToastContext';

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
  description: 'Please refresh and try again.',
  type: 'error',
};

// When something fails on back-end because it is not unique
export const serverErrorUniquenessMessage: (value: string) => ShowToastProps = (
  message: string
) => {
  return {
    title: 'This record already exists',
    description: message,
    type: 'error',
  };
};

const successMessage: (value: string) => ShowToastProps = (message: string) => {
  return {
    title: 'Success',
    description: message,
    type: 'success',
  };
};

// When getting started page called fetch successfully
export const successGettingStartedMessage: ShowToastProps = successMessage(
  'Your settings have been saved!'
);

// When course added successfully
export const successAddCourseMessage: ShowToastProps = successMessage(
  'Your course was added successfully!'
); 

// When course added successfully
export const successUpdateCourseMessage: ShowToastProps = successMessage(
  'Your course was updated successfully!'
); 

// When course deleted successfully
export const successDeleteCourseMessage: ShowToastProps = successMessage(
  'Your course was deleted successfully!'
);