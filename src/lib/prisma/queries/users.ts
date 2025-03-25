import prisma from '@/lib/prisma/prisma';
import { prismaTryCatch } from '@/lib/utils/tryCatchWrappers';
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
              }
            },
          },
        });
        return user;
      }),
    ['dashboard', uid],
    {
      tags: [
        'dashboard',
        `user:${uid}`
      ],
    }
  )();
};
