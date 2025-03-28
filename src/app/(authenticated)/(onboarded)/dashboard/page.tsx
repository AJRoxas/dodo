import Button from '@/components/Button';
import CourseCard from '@/components/dashboard/CourseCard';
import DashboardHeading from '@/components/dashboard/DashboardHeading';
import DialogModal from '@/components/DialogModal';
import FormSwitch from '@/components/forms/FormSwitch';
import Scrollable from '@/components/Scrollable';
import { retrieveDecodedTokens } from '@/lib/auth/token';
import { getCachedUserDashboardData } from '@/lib/prisma/queries/users';
import { CourseWithStats } from '@@/types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
      <div className="container-dashboard bg-primary md:w-px-375 text-light  md:motion-safe:animate-fade-right">
        <DashboardHeading
          cGpa={cGpa}
          finalGpaGoal={final_gpa_goal}
          credits={credits}
          requiredCredits={required_credits}
        />
      </div>
      <div className="container-dashboard md:items-start">
        <div className="flex flex-col lg:flex-row items-start justify-between w-75 md:w-full">
          <div>
            <span className="font-semibold text-2xl">Courses | </span>
            <span className="font-semibold text-sm">
              Credits: {credits.toFixed(2)} of {required_credits.toFixed(2)}
            </span>
          </div>
          <DialogModal
            title="Add a Course"
            actionLabel='Add Course'
            trigger={
              <Button size="sm" isHalved={true} icon={faPlus}>
                Add Course
              </Button>
            }
            body={<FormSwitch/>}
          />
        </div>
        <Scrollable>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start content-start p-0 md:p-1 motion-safe:animate-fade-up">
            {courses.map((course: CourseWithStats) => {
              return <CourseCard key={course.id} course={course} />;
            })}
          </div>
        </Scrollable>
      </div>
    </main>
  );
};

export default DashboardPage;
