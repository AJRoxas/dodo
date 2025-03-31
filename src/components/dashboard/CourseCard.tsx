'use client';

import CourseAssessmentCard from '@/components/CourseAssessmentCard';
import { CourseWithStats } from '@@/types';

interface CourseCardProps {
  course: CourseWithStats;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <CourseAssessmentCard
      isAssessment={false}
      label={course.course_code}
      subOne={`Grade: ${course.mark}% | ${course.gpaEntry?.gpa} | ${course.gpaEntry?.letter}`}
      subTwo={`Credits: ${course.weight}`}
      barLabel="Progress"
      barValue={course.progress!}
    />
  );
};

export default CourseCard;
