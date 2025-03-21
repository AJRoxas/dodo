'use client';

import { Form } from 'radix-ui';
import Button from '@/components/Button';
import GpaScale from '@/components/forms/GpaScale';
import {
  validateAcademicGoals,
  validateGpaScaleInput,
  validateUserSettings,
} from '@/lib/utils/validations';
import { usersettings } from '@prisma/client';
import AcademicGoals from '../forms/templates/AcademicGoals';
import { useState } from 'react';
import ToastWrapper from '../ToastWrapper';

const GettingStartedForm = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'error' | 'success' | 'default' | undefined>(
    undefined
  );
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const formSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    setTimeout(() => {
      const academicGoals = {
        required_credits: Number(formData.required_credits),
        final_gpa_goal: Number(formData.final_gpa_goal),
        initial_credits: Number(formData.initial_credits),
        initial_gpa: Number(formData.initial_gpa),
      } as usersettings;

      const gpaScale = JSON.parse(formData.gpa_scale as string);

      if (!validateUserSettings(academicGoals, gpaScale)) {
        if (
          validateGpaScaleInput(gpaScale) &&
          validateAcademicGoals(academicGoals)
        ) {
          setTitle('Invalid Form');
          setMessage('Please check your form and try again.');
        } else {
          setTitle('Unexpected Form Change Detected');
          setMessage('Try refreshing the page.');
        }

        setType('error');
      } else {
        setTitle('Success');
        setMessage('Your information is being saved!');
        setType('success');
      }
      setOpen(true);
    }, 200);
  };

  return (
    <ToastWrapper
      title={title}
      description={message}
      state={open}
      setState={setOpen}
      toastType={type}
    >
      <Form.Root onSubmit={formSubmission}>
        <div className="flex flex-col gap-8 w-75 sm:w-160 motion-safe:animate-fade-left">
          <div>
            <div className="text-3xl font-semibold">Getting Started</div>
            <div className="text-sm">
              Answer the following questions to get started
            </div>
          </div>
          <AcademicGoals />
          <GpaScale />
          <Form.Submit asChild>
            <Button>Submit</Button>
          </Form.Submit>
        </div>
      </Form.Root>
    </ToastWrapper>
  );
};

export default GettingStartedForm;
