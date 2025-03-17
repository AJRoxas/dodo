'use-client';

import { Form } from 'radix-ui';
import Button from '@/components/Button';
import { FormInput } from '@/components/forms/FormInput';

const GettingStartedForm = () => {
  const formSubmission = async (formData: FormData) => {
    'use server';

    console.log(formData);
  };
  
  return (
    <Form.Root action={formSubmission}>
      <div className="flex flex-col gap-8 w-px-300 sm:w-px-640 motion-safe:animate-fade-left">
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
              max={4}
              required={true}
              type="number"
              placeholder="4.0"
              step="0.01"
            ></FormInput>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="text-2xl font-semibold">Add Completed Courses</div>
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
              max={4}
              required={true}
              type="number"
              placeholder="4.0"
              step="0.01"
            ></FormInput>
          </div>
        </div>

        <Form.Submit asChild>
          <Button>Submit</Button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
};

export default GettingStartedForm;
