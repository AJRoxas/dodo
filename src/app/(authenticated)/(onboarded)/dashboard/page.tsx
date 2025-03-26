import DashboardHeading from '@/components/dashboard/DashboardHeading';
import { retrieveDecodedTokens } from '@/lib/auth/token';
import { getCachedUserDashboardData } from '@/lib/prisma/queries/users';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const DashboardPage = async () => {
  const user = await retrieveDecodedTokens(await cookies());
  if (!user) return notFound();

  const dashboardData = await getCachedUserDashboardData(user.uid);

  const { cGpa, credits } = dashboardData;

  const { required_credits, final_gpa_goal } = dashboardData.usersettings;

  return (
    <main className="flex flex-col md:flex-row justify-between items-center">
      <div className="container-col justify-start bg-primary md:min-h-[calc(100vh_-_64px)] md:w-px-375 text-light motion-safe:animate-fade-right">
        <DashboardHeading
          cGpa={cGpa}
          finalGpaGoal={final_gpa_goal}
          credits={credits}
          requiredCredits={required_credits}
        />
      </div>
    </main>
  );
};

export default DashboardPage;
