import Logo from '@@/public/dodo-title.svg';
import Link from 'next/link';

const SignInLink = () => {
  return (
    <>
      <Link href="/sign-in">Sign in</Link>
      <Link href="/sign-up">Sign up</Link>
    </>
  );
};

const AuthenticatedLinks = () => {
  return <div></div>;
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
          <Logo className="h-8 w-fit fill-primary self-end"></Logo>
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
