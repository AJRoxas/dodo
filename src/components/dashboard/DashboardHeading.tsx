import { getFutureGpaRequirements } from "@/lib/utils/gpaScale";

interface DashboardHeadingProps {
  cGpa: number;
  finalGpaGoal: number;
  credits: number;
  requiredCredits: number;
}

const DashboardHeading = ({
  cGpa,
  finalGpaGoal,
  credits,
  requiredCredits,
}: DashboardHeadingProps) => {
  return (
    <>
      <div className="font-semibold text-3xl">Dashboard</div>
      <div>
        <div className="flex justify-between items-center w-75">
          <div className="font-semibold text-2xl">GPA {cGpa.toFixed(2)}</div>
          <div className="font-semibold text-2xl">
            Goal {finalGpaGoal.toFixed(2)}
          </div>
        </div>
        <div className="text-center">
          {credits < requiredCredits ? (
            <>
              You need a{' '}
              <strong>
                {getFutureGpaRequirements(
                  credits,
                  cGpa,
                  requiredCredits,
                  finalGpaGoal
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
    </>
  );
};

export default DashboardHeading;
