'use client';

import Button from '@/components/Button';
import CourseForm from '@/components/courses/CourseForm';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDialog } from '@/context/DialogContext';

const AddCourseButton = () => {
  const { openDialog } = useDialog();
  return (
    <Button
      size="sm"
      isHalved={true}
      icon={faPlus}
      onClick={() => {
        openDialog({
          title: 'Add a Course',
          content: <CourseForm mode="add" />,
        });
      }}
    >
      Add Course
    </Button>
  );
};

export default AddCourseButton;
