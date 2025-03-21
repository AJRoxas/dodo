import prisma from '@/lib/prisma/prisma';
import { prismaTryCatch } from '@/lib/utils/tryCatchWrappers';
import { Prisma, usersettings } from '@prisma/client';

export const getUserSetting = (uid: string) => {
  return prismaTryCatch(async () => {
    const user = await prisma.usersettings.findUnique({
      where: {
        user_id: uid,
      },
    });
    return user;
  });
};

export const createUserSetting = (usersettings: usersettings) => {
  return prismaTryCatch(async () => {
    const newUserSetting = await prisma.usersettings.create({
      data: {
        user_id: usersettings.user_id,
        required_credits: usersettings.required_credits,
        final_gpa_goal: usersettings.final_gpa_goal,
        initial_credits: usersettings.initial_credits,
        initial_gpa: usersettings.initial_gpa,
        gpa_scale: usersettings.gpa_scale as Prisma.JsonArray
      }
    });

    return newUserSetting;
  });
};

export const updateUserSetting = (usersettings: usersettings) => {
  return prismaTryCatch(async () => {
    const updatedUserSetting = await prisma.usersettings.update({
      where: {
        user_id: usersettings.user_id,
      },
      data: {
        initial_credits: usersettings.initial_credits,
        initial_gpa: usersettings.initial_gpa,
        required_credits: usersettings.required_credits,
        final_gpa_goal: usersettings.final_gpa_goal,
      },
    });
    return updatedUserSetting;
  });
};

export const deleteUserSetting = (uid: string) => {
  return prismaTryCatch(async () => {
    const deletedUserSetting = await prisma.usersettings.delete({
      where: {
        user_id: uid,
      },
    });
    return deletedUserSetting;
  });
};
