import { retrieveDecodedTokens } from '@/lib/auth/token';
import { getCachedUserDashboardData } from '@/lib/prisma/queries/users';
import { getFutureGpaRequirements } from '@/lib/utils/gpaScale';
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
        <div className="font-semibold text-3xl">Dashboard</div>
        <div>
          <div className="flex justify-between items-center w-75">
            <div className="font-semibold text-2xl">GPA {cGpa.toFixed(2)}</div>
            <div className="font-semibold text-2xl">
              Goal {final_gpa_goal.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            {credits < required_credits ? (
              <>
                You need a{' '}
                <strong>
                  {getFutureGpaRequirements(
                    credits,
                    cGpa,
                    required_credits,
                    final_gpa_goal
                  ).toFixed(2)}{' '}
                  GPA
                </strong>{' '}
                in the rest of your courses to reach your goal
              </>
            ) : (
              'You have reached or exceeded the credits required to meet your goals!'
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
