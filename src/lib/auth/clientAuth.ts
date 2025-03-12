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
import { asyncTryCatch } from '@/lib/utils/tryCatchWrappers';

const signInUser = (credentials: any) => {
  return asyncTryCatch(async () => {
    const idToken = await credentials.user.getIdToken();
    await fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const user = auth.currentUser!;

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.uid,
        email: user.email,
        is_anon: user.isAnonymous,
      }),
    });

    return response.ok;
  }, false);
};

const signInUserAnonymously = () => {
  return asyncTryCatch(async () => {
    const credentials = await signInAnonymously(auth);
    return signInUser(credentials);
  }, false);
};

const signInUserUsingSSO = (provider: AuthProvider) => {
  return asyncTryCatch(async () => {
    const credentials = await signInWithPopup(auth, provider);
    return signInUser(credentials);
  }, false);
};

const signInUserUsingGoogle = () => {
  return signInUserUsingSSO(googleProvider);
};

const signInUserUsingGitHub = () => {
  return signInUserUsingSSO(gitHubProvider);
};

const signOutUser = () => {
  return asyncTryCatch(async () => {
    const user = auth.currentUser!;

    if (user.isAnonymous) {
      const response = await fetch('/api/user/' + user.uid, {
        method: 'DELETE',
      });

      if (response.ok) {
        await deleteUser(user);
      } else {
        const err = await response.json()
        console.log(err)
      }
    }

    await signOut(auth);
    await fetch('/api/logout');

    return true;
  }, false);
};

export {
  signInUserAnonymously,
  signInUserUsingGoogle,
  signInUserUsingGitHub,
  signOutUser,
};
