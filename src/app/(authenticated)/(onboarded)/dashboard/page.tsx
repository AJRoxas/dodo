import CourseCard from '@/components/dashboard/CourseCard';
import DashboardHeading from '@/components/dashboard/DashboardHeading';
import Scrollable from '@/components/Scrollable';
import { retrieveDecodedTokens } from '@/lib/auth/token';
import { getCachedUserDashboardData } from '@/lib/prisma/queries/users';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const DashboardPage = async () => {
  const user = await retrieveDecodedTokens(await cookies());
  if (!user) return notFound();

  const dashboardData = await getCachedUserDashboardData(user.uid);

  const { cGpa, credits, courses } = dashboardData;

  const { required_credits, final_gpa_goal } = dashboardData.usersettings;

  return (
    <main className="flex flex-col md:flex-row justify-between items-center">
      <div className="container-dashboard bg-primary md:w-px-375 text-light motion-safe:animate-fade-right">
        <DashboardHeading
          cGpa={cGpa}
          finalGpaGoal={final_gpa_goal}
          credits={credits}
          requiredCredits={required_credits}
        />
      </div>
      <div className="container-dashboard md:items-start">
        <div className="flex justify-between items-end w-full">
          <div className="font-semibold text-2xl">Courses</div>
          <div className="font-semibold text-sm xs:text-base">
            Credits: {credits.toFixed(2)} of {required_credits.toFixed(2)}
          </div>
        </div>
        <Scrollable>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start content-start p-1 motion-safe:animate-fade-up">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </Scrollable>
      </div>
    </main>
  );
};

export default DashboardPage;
