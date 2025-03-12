import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

export const googleProvider = new GoogleAuthProvider();

export const gitHubProvider = new GithubAuthProvider();
gitHubProvider.setCustomParameters({
  allow_signup: 'false',
});
