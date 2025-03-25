import { retrieveDecodedTokens } from "@/lib/auth/token";
import { getCachedUserDashboardData } from "@/lib/prisma/queries/users";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const DashboardPage = async () => {
  const user = await retrieveDecodedTokens(await cookies());

  if (!user) return notFound();

  const dashboardData = await getCachedUserDashboardData(user.uid);
  console.log(dashboardData);

  return(
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="container-col bg-primary min-h-[calc(100vh_-_64px)] lg:w-px-375"></div>
    </div>
  );
};

export default DashboardPage;