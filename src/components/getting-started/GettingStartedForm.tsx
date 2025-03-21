'use client';

import { Form } from 'radix-ui';
import Button from '@/components/Button';
import GpaScale from '@/components/forms/GpaScale';
import { validateUserSettings } from '@/lib/utils/validations';
import { usersettings } from '@prisma/client';
import AcademicGoals from '../forms/templates/AcademicGoals';
import { useState } from 'react';
import ToastWrapper from '../ToastWrapper';

const GettingStartedForm = () => {
  const [error, setError] = useState(false);

  const formSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    const academicGoals = {
      required_credits: Number(formData.required_credits),
      final_gpa_goal: Number(formData.final_gpa_goal),
      initial_credits: Number(formData.initial_credits),
      initial_gpa: Number(formData.initial_gpa),
    } as usersettings;

    const gpaScale = JSON.parse(formData.gpa_scale as string);

    console.log(validateUserSettings(academicGoals, gpaScale));

    setError(true);
  };

  return (
    <ToastWrapper state={error} setState={setError}>
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
