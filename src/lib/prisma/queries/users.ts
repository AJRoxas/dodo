import prisma from '@/lib/prisma/prisma';
import { addCourseStats } from '@/lib/utils/course';
import { prismaTryCatch } from '@/lib/utils/tryCatchWrappers';
import { CourseWithStats, GpaScaleEntry } from '@@/types';
import { users } from '@prisma/client';
import { unstable_cache } from 'next/cache';

export const getUser = (uid: string) => {
  return prismaTryCatch(async () => {
    const user = await prisma.users.findUnique({
      where: {
        id: uid,
      },
    });
    return user;
  });
};

export const createUser = (user: users) => {
  return prismaTryCatch(async () => {
    const newUser = await prisma.users.create({
      data: user,
    });
    return newUser;
  });
};

export const updateUser = (user: users) => {
  return prismaTryCatch(async () => {
    const updatedUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        is_anon: user.is_anon,
      },
    });
    return updatedUser;
  });
};

export const deleteUser = (uid: string) => {
  return prismaTryCatch(async () => {
    const deletedUser = await prisma.users.delete({
      where: {
        id: uid,
      },
    });
    return deletedUser;
  });
};

export const getCachedUserDashboardData = (uid: string) => {
  return unstable_cache(
    () =>
      prismaTryCatch(async () => {
        const user = await prisma.users.findUnique({
          where: {
            id: uid,
          },
          include: {
            usersettings: true,
            courses: {
              include: {
                assessments: true,
                coursetags: true,
              },
            },
          },
        });

        if (!user) {
          return user;
        }

        user.courses.forEach((course) => {
          addCourseStats(
            course,
            user.usersettings!.gpa_scale! as GpaScaleEntry[]
          );
        });

        const credits = user.courses.length
          ? user.courses
              .filter((course) => (course as CourseWithStats).progress == 100)
              .reduce((pre, cur) => pre + (cur as CourseWithStats).weight, 0) +
            user.usersettings!.initial_credits
          : user.usersettings!.initial_credits;

        const cGpa = user.courses.length
          ? (user.courses
              .filter((course) => (course as CourseWithStats).progress == 100)
              .reduce(
                (pre, cur) =>
                  pre + (cur as CourseWithStats).gpaEntry!.gpa! * cur.weight,
                0
              ) +
              user.usersettings!.initial_gpa) /
            credits
          : user.usersettings!.initial_gpa;

        const dashboard = {
          ...user,
          cGpa: cGpa,
          credits: credits,
        };

        return dashboard;
      }),
    ['dashboard', uid],
    {
      tags: ['dashboard', `user:${uid}`],
    }
  )();
};
