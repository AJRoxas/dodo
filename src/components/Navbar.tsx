'use client';

import app from '@/lib/firebase/firebase';
import Logo from '@@/public/dodo-title.svg';
import { deleteUser, getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignInLink = () => {
  return (
    <>
      <Link href="/sign-in">Sign in</Link>
    </>
  );
};

const AuthenticatedLinks = () => {
  const router = useRouter();

  return (
    <>
      <Link
        href="#"
        onClick={async () => {
          try {
            const auth = getAuth(app);
            const user = auth.currentUser!;

            if (user.isAnonymous) {
              await deleteUser(user);
            }

            await signOut(auth);
            await fetch('/api/logout');
            router.push('/sign-in');
          } catch (error) {
            console.log((error as Error).message);
          }
        }}
      >
        Logout
      </Link>
    </>
  );
};

interface NavBarProps {
  // Changes the appearance of navigation if the user is authenticated
  isAuthenticated: boolean;
}

const NavBar = ({ isAuthenticated }: NavBarProps) => {
  return (
    <nav className="flex justify-center p-4 shadow-sm">
      <div className="flex justify-between items-end w-full max-w-7xl">
        <Link href="/" aria-label="Return back home">
          <Logo className="h-8 w-30 fill-primary self-end"></Logo>
        </Link>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <AuthenticatedLinks></AuthenticatedLinks>
          ) : (
            <SignInLink></SignInLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
