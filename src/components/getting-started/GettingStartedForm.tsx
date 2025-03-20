'use client';

import { Form } from 'radix-ui';
import Button from '@/components/Button';
import { FormInput } from '@/components/forms/FormInput';
import GpaScale from '@/components/forms/GpaScale';
import { validateGpaScale, validateUserSetting } from '@/lib/utils/validations';

const GettingStartedForm = () => {
  const formSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    const userSetting = {
      required_credits: Number(formData.required_credits),
      final_gpa_goal: Number(formData.final_gpa_goal),
      initial_credits: Number(formData.initial_credits),
      initial_gpa: Number(formData.initial_gpa),
    };
    const gpaScale = JSON.parse(formData.gpa_scale as string);

    console.log(validateUserSetting(userSetting));
    console.log(validateGpaScale(gpaScale));

    console.log(formData);
  };

  return (
    <Form.Root onSubmit={formSubmission}>
      <div className="flex flex-col gap-8 w-75 sm:w-160 motion-safe:animate-fade-left">
        <div>
          <div className="text-3xl font-semibold">Getting Started</div>
          <div className="text-sm">
            Answer the following questions to get started
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">Academic Goals</div>
          <div className="flex flex-wrap justify-between gap-4">
            <FormInput
              name="required_credits"
              label="Required Credits"
              min={0}
              required={true}
              type="number"
              placeholder="20.0"
              step="0.01"
            ></FormInput>
            <FormInput
              name="final_gpa_goal"
              label="Final GPA Goal"
              min={0}
              required={true}
              type="number"
              placeholder="4.0"
              step="0.01"
            ></FormInput>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="text-xl font-semibold">Add Completed Courses</div>
            <div className="text-sm">
              If you already completed courses, you can add your current GPA
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-4">
            <FormInput
              name="initial_credits"
              label="Initial Credits"
              min={0}
              required={true}
              type="number"
              placeholder="20.0"
              step="0.01"
            ></FormInput>
            <FormInput
              name="initial_gpa"
              label="Initial GPA"
              min={0}
              required={true}
              type="number"
              placeholder="4.0"
              step="0.01"
            ></FormInput>
          </div>
        </div>

        <GpaScale />

        <Form.Submit asChild>
          <Button>Submit</Button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
};

export default GettingStartedForm;
