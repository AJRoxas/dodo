'use client';

import { Form } from 'radix-ui';
import Button from '@/components/Button';
import GpaScale from '@/components/forms/templates/GpaScale';
import {
  validateAcademicGoals,
  validateGpaScaleInput,
  validateUserSettings,
} from '@/lib/utils/validations';
import { usersettings } from '@prisma/client';
import AcademicGoals from '../forms/templates/AcademicGoals';
import { useToast } from '@/components/ToastWrapper';
import { auth } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';

const GettingStartedForm = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const formSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = Object.fromEntries(new FormData(event.currentTarget));
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
        showToast({
          title: 'Invalid Form',
          description: 'Please check your form and try again.',
          type: 'error',
        });
      } else {
        showToast({
          title: 'Unexpected Form Change Detected',
          description: 'Try refreshing the page.',
          type: 'error',
        });
      }
    } else {
      showToast({
        title: 'Success',
        description: 'Your information is being saved!',
        type: 'success',
      });

      const response = await fetch('/api/user-setting', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: auth.currentUser?.uid,
          required_credits: academicGoals.required_credits,
          final_gpa_goal: academicGoals.final_gpa_goal,
          initial_gpa: academicGoals.initial_gpa,
          initial_credits: academicGoals.initial_credits,
          gpa_scale: gpaScale,
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        showToast({
          title: 'Server Error',
          description:
            'Your information was not saved, please refresh and try again.',
          type: 'error',
        });
      }
    }
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
        <AcademicGoals />
        <GpaScale />
        <Form.Submit asChild>
          <Button>Submit</Button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
};

export default GettingStartedForm;
