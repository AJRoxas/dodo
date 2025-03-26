import { CourseWithStats, GpaScaleEntry } from '@@/types';
import { getGpa } from '@/lib/utils/gpaScale';

export const addCourseStatsFromList = (
  courses: CourseWithStats[],
  gpaScale: GpaScaleEntry[]
) => {
  courses.forEach((course) => {
    addCourseStats(course, gpaScale);
  });
};

export const addCourseStats = (
  course: CourseWithStats,
  gpaScale: GpaScaleEntry[]
) => {
  const mark = course.assessments.reduce((pre, cur) => {
    return pre + (cur.points_earned / cur.potential_points) * cur.weight;
  }, 0);

  const progress = course.assessments.reduce((pre, cur) => {
    return pre + cur.weight;
  }, 0);

  const gpaEntry = getGpa(mark, gpaScale);

  (course as CourseWithStats).mark = mark;
  (course as CourseWithStats).progress = progress;
  (course as CourseWithStats).gpaEntry = gpaEntry;
};
