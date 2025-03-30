'use client';

import { Form } from 'radix-ui';
import Button from '@/components/Button';
import { useDialogModal } from '@/components/DialogModal';
import CourseField from '@/components/forms/fields/CourseField';
import { tags } from '@prisma/client';

interface AddCourseFormProps {
  tags: tags[];
}

const AddCourseForm = ({ tags }: Readonly<AddCourseFormProps>) => {
  const { setDialogModal } = useDialogModal();
  const submitTest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = Object.fromEntries(new FormData(event.currentTarget));
    console.log(formData);
    setDialogModal(false);
  };
  return (
    <Form.Root onSubmit={submitTest} id="test">
      <CourseField tags={tags} selectPlaceholder='Choose a semester'/>
      <Form.Submit asChild>
        <Button>Add Course</Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default AddCourseForm;
