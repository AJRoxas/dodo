'use client';

import { Form } from 'radix-ui';
import Button from '@/components/Button';
import { useDialog } from '@/context/DialogContext';
import CourseField from '@/components/forms/fieldGroups/CourseField';
import { courses } from '@prisma/client';
import { auth } from '@/lib/firebase/firebase';
import { useToast } from '@/context/ToastContext';
import {
  serverErrorMessage,
  serverErrorUniquenessMessage,
  successAddCourseMessage,
  successUpdateCourseMessage,
  unexpectedFormChangeMessage,
} from '@/lib/utils/toastMessages';
import { validateCourse } from '@/lib/utils/validations';
import { useRouter } from 'next/navigation';
import { useTags } from '@/context/TagContext';
import {
  CourseWithAssessments,
  CourseWithStats,
  CourseWithTags,
} from '@@/types';

interface CourseFormProps {
  mode: 'edit' | 'add';
  course?: CourseWithTags | CourseWithAssessments | CourseWithStats;
}

const CourseForm = ({ mode, course }: CourseFormProps) => {
  const router = useRouter();
  const tags = useTags();

  const { closeDialog } = useDialog();
  const { showToast } = useToast();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    const uid = auth.currentUser?.uid ?? '';

    const formCourse: courses = {
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
      !validateCourse(formCourse) ||
      !tags.find((tag) => tag.id === courseTag.tag_id)
    ) {
      showToast(unexpectedFormChangeMessage);
    } else {
      const response =
        mode == 'edit'
          ? await fetch('/api/course/' + Number(course!.id), {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...formCourse,
                coursetags: [courseTag],
              }),
            })
          : await fetch('/api/course', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...formCourse,
                coursetags: [courseTag],
              }),
            });

      if (response.ok) {
        showToast(
          mode == 'edit' ? successUpdateCourseMessage : successAddCourseMessage
        );
        router.refresh();
      } else {
        const error = (await response.json()).error;
        if (error == 'P2002') {
          showToast(
            serverErrorUniquenessMessage('Course code must be unique!')
          );
        } else {
          console.log(error);
          showToast(serverErrorMessage);
        }
      }
    }

    closeDialog();
  };
  return (
    <Form.Root onSubmit={submitForm} id="test">
      <CourseField course={course} />
      <Form.Submit asChild>
        <Button>
          {mode == 'edit' ? 'Update' : 'Add Course'}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default CourseForm;
