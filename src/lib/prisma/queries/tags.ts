import prisma from '@/lib/prisma/prisma';
import { prismaTryCatch } from '@/lib/utils/tryCatchWrappers';
import { unstable_cache } from 'next/cache';

export const getTags = () => {
  return prismaTryCatch(async () => {
    const tags = await prisma.tags.findMany();
    return tags;
  })
}

export const getCachedTags = () => {
  return unstable_cache(
    () => getTags(),
    ['tags'],
    {
      tags: ['dashboard', `tags`],
    }
  )();
};
