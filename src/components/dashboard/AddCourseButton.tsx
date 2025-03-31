'use client';

import Button from '@/components/Button';
import AddCourseForm from '@/components/dashboard/AddCourseForm';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { tags } from '@prisma/client';
import { useDialog } from '@/components/DialogWrapper';

const AddCourseButton = ({tags}: {tags: tags[]}) => {
  const { openDialog } = useDialog();
  return (
    <Button
      size="sm"
      isHalved={true}
      icon={faPlus}
      onClick={() => {
        openDialog({
          title: 'Add a Course',
          content: <AddCourseForm tags={tags} />,
        });
      }}
    >
      Add Course
    </Button>
  );
};

export default AddCourseButton;
