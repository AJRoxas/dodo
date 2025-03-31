import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export const asyncTryCatch = async (func: any, returnError?: any) => {
  try {
    return await func();
  } catch (error) {
    console.log((error as Error).message);
    return returnError;
  }
};

export const prismaTryCatch = async (func: any) => {
  try {
    return await func();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { error: error.code };
    }
    console.log(error)
    return null;
  }
};

export const apiTryCatch = async (func: any) => {
  try {
    return await func();
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
};
