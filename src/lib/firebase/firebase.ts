// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { firebaseClientConfig } from '@/lib/firebase/config';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
export const app = initializeApp(firebaseClientConfig);

// Initialize Authentication
export const auth = getAuth(app);