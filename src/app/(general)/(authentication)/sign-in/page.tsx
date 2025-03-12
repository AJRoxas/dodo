import SignInSection from '@/components/authentication/SignInSection';
import Icon from '@@/public/dodo-icon.svg';

const SignInPage = () => {
  return (
    <main className="container-col">
      <div className="flex flex-col max-w-px-300 gap-8">
        <div className="flex flex-col justify-center items-center motion-safe:animate-fade-left">
          <Icon className="h-16 w-fit fill-primary"></Icon>
          <div className="font-semibold text-3xl text-primary">
            Sign in to dodo
          </div>
          <div className="font-semibold text-sm text-center mt-1">
            Don&apos;t have an account? Continue and we&apos;ll create one for
            you!
          </div>
        </div>
        <SignInSection />
      </div>
    </main>
  );
};

export default SignInPage;
