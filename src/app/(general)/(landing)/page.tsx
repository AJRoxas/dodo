import FeaturesSection from '@/components/landing/FeaturesSection';
import HookSection from '@/components/landing/HookSection';

const LandingPage = () => {
  return (
    <main>
      <HookSection />
      <FeaturesSection />
      <div className="flex flex-col justify-center items-center gap-1 p-10 sm:p-20">
        <div className="max-w-xs font-semibold text-3xl text-center text-primary">
          Want to know more about dodo?
        </div>
        <div className="max-w-xs text-center w-full">
          You can visit the{' '}
          <a href="https://github.com/AJRoxas/dodo">
            <u>dodo repository</u>
          </a>{' '}
          to learn more about this project!
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
