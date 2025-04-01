'use client';

import { Form } from 'radix-ui';
import Button from '@/components/Button';
import { useDialog } from '@/context/DialogContext';
import CourseField from '@/components/forms/fields/CourseField';
import { courses, tags } from '@prisma/client';
import { auth } from '@/lib/firebase/firebase';
import { useToast } from '@/context/ToastContext';
import {
  serverErrorMessage,
  serverErrorUniquenessMessage,
  successAddCourseMessage,
  unexpectedFormChangeMessage,
} from '@/lib/utils/toastMessages';
import { validateCourse } from '@/lib/utils/validations';
import { useRouter } from 'next/navigation';

interface AddCourseFormProps {
  tags: tags[];
}

const AddCourseForm = ({ tags }: Readonly<AddCourseFormProps>) => {
  const router = useRouter();
  const { closeDialog } = useDialog();
  const { showToast } = useToast();
  const submitTest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    const uid = auth.currentUser?.uid ?? '';

    const course: courses = {
      id: -1,
      user_id: uid,
      course_code: formData.course_code.toString().trim(),
      weight: Number(formData.weight),
      goal_grade: Number(formData.goal_grade),
      is_pass_fail: Boolean(formData.is_pass_fail),
      year: Number(formData.year),
    };

    const courseTag = {
      tag_id: Number(formData.tag),
    };

    if (
      !validateCourse(course) ||
      !tags.find((tag) => tag.id === courseTag.tag_id)
    ) {
      showToast(unexpectedFormChangeMessage);
    } else {
      const response = await fetch('/api/course', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...course,
          coursetags: [courseTag],
        }),
      });

      if (response.ok) {
        showToast(successAddCourseMessage);
        router.refresh();
      } else {
        const error = (await response.json()).error;
        if (error == 'P2002') {
          showToast(
            serverErrorUniquenessMessage('Course code must be unique!')
          );
        } else {
          console.log(error)
          showToast(serverErrorMessage);
        }
      }
    }

    closeDialog();
  };
  return (
    <Form.Root onSubmit={submitTest} id="test">
      <CourseField tags={tags} selectPlaceholder="Choose a semester" />
      <Form.Submit asChild>
        <Button>Add Course</Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default AddCourseForm;
