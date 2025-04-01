import prisma from '@/lib/prisma/prisma';
import { prismaTryCatch } from '@/lib/utils/tryCatchWrappers';
import { CourseWithTags } from '@@/types';

export const getCourse = (id: number) => {
  return prismaTryCatch(async () => {
    const course = await prisma.courses.findUnique({
      where: {
        id: id,
      },
    });
    return course;
  });
};

export const createCourse = ({
  coursetags,
  ...course
}: Omit<CourseWithTags, 'id'>) => {
  return prismaTryCatch(async () => {
    const newCourse = await prisma.courses.create({
      data: {
        ...course,
        coursetags: {
          create: coursetags,
        },
      },
      include: {
        coursetags: true,
      },
    });
    return newCourse;
  });
};

export const updateCourse = (course: CourseWithTags) => {
  return prismaTryCatch(async () => {
    await prisma.coursetags.deleteMany({
      where: {
        course_id: course.id,
      },
    });

    await prisma.coursetags.createMany({
      data: course.coursetags,
    });

    const updatedCourse = await prisma.courses.update({
      where: {
        id: course.id,
      },
      data: {
        course_code: course.course_code,
        weight: course.weight,
        goal_grade: course.goal_grade,
        is_pass_fail: course.is_pass_fail,
        year: course.year,
        coursetags: {
          set: course.coursetags.map((courseTag) => ({
            course_id_tag_id: courseTag,
          })),
        },
      },
    });
    return updatedCourse;
  });
};

export const deleteCourse = (id: number) => {
  return prismaTryCatch(async () => {
    const deletedCourse = await prisma.courses.delete({
      where: {
        id: Number(id),
      },
    });
    return deletedCourse;
  });
};
