import SignInSection from '@/components/authentication/SignInSection';
import Icon from '@@/public/dodo-icon.svg';

const SignInPage = () => {
  return (
    <main className="flex flex-col justify-center items-center p-10 sm:p-20 max-w-px-300 min-h-full gap-8">
      <div className="flex flex-col justify-center items-center motion-safe:animate-fade-left">
        <Icon className="h-16 w-fit fill-primary"></Icon>
        <div className="font-semibold text-3xl text-primary">
          Sign in to dodo
        </div>
        <div className="font-semibold text-sm text-center mt-1">
          Don&apos;t have an account? Continue and we&apos;ll create one for you!
        </div>
      </div>
      <SignInSection />
    </main>
  );
};

export default SignInPage;
