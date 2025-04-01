'use client';

import CourseAssessmentCard from '@/components/CourseAssessmentCard';
import { CourseWithStats } from '@@/types';
import { useAlert } from '@/context/AlertContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import {
  serverErrorMessage,
  successDeleteCourseMessage,
} from '@/lib/utils/toastMessages';
import { useDialog } from '@/context/DialogContext';
import CourseForm from '@/components/courses/CourseForm';

interface CourseCardProps {
  course: CourseWithStats;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const router = useRouter();
  const { openDialog } = useDialog();
  const { openAlert, closeAlert } = useAlert();
  const { showToast } = useToast();

  const deleteCourse = () => {
    return async () => {
      const response = await fetch('/api/course/' + Number(course.id), {
        method: 'DELETE',
      });

      if (response.ok) {
        showToast(successDeleteCourseMessage);
        router.refresh();
      } else {
        const error = (await response.json()).error;
        console.log(error);
        showToast(serverErrorMessage);
      }

      closeAlert();
    };
  };

  const dialogCourseEdit = () => {
    openDialog({
      title: `Edit ${course.course_code}`,
      content: <CourseForm mode="edit" course={course} />,
    });
  };

  const alertCourseDelete = () => {
    openAlert({
      title: `Delete ${course.course_code}?`,
      description: `This cannot be undone. By clicking 'Confirm' you will delete this course from our database. Are you sure you want to continue?`,
      cancelLabel: 'Cancel',
      actionLabel: 'Confirm',
      onAction: deleteCourse,
    });
  };

  return (
    <CourseAssessmentCard
      isAssessment={false}
      label={course.course_code}
      subOne={`Grade: ${course.mark}% | ${course.gpaEntry?.gpa} | ${course.gpaEntry?.letter}`}
      subTwo={`Credits: ${course.weight}`}
      barLabel="Progress"
      barValue={course.progress!}
      onEdit={dialogCourseEdit}
      onDelete={alertCourseDelete}
    />
  );
};

export default CourseCard;
