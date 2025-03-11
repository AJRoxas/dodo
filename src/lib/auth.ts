'use-client';

import { auth } from '@/lib/firebase/firebase';
import {
  AuthProvider,
  deleteUser,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { gitHubProvider, googleProvider } from '@/lib/firebase/providers';

const signInUser = async (credentials: any) => {
  try {
    const idToken = await credentials.user.getIdToken();
    await fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    return true;
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
};

const signInUserAnonymously = async () => {
  try {
    const credentials = await signInAnonymously(auth);
    return await signInUser(credentials);
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
};

const signInUserUsingSSO = async (provider: AuthProvider) => {
  try {
    const credentials = await signInWithPopup(auth, provider);
    return await signInUser(credentials);
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
};

const signInUserUsingGoogle = async () => {
  return await signInUserUsingSSO(googleProvider);
};

const signInUserUsingGitHub = async () => {
  return await signInUserUsingSSO(gitHubProvider);
};

const signOutUser = async () => {
  try {
    const user = auth.currentUser!;

    if (user.isAnonymous) {
      await deleteUser(user);
    }

    await signOut(auth);
    await fetch('/api/logout');

    return true;
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
};

export {
  signInUserAnonymously,
  signInUserUsingGoogle,
  signInUserUsingGitHub,
  signOutUser,
};
