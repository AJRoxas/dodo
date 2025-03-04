import NavBar from '@/components/Navbar';
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { firebaseClientConfig, firebaseServerConfig } from "@/lib/firebase/config";
import { redirect } from 'next/navigation';


const AuthenticatedLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {

  const tokens = await getTokens(await cookies(), {
    apiKey: firebaseClientConfig.apiKey,
    cookieName: firebaseServerConfig.cookieName,
    cookieSignatureKeys: firebaseServerConfig.cookieSignatureKeys,
    serviceAccount: firebaseServerConfig.serviceAccount,
  });

  if (!tokens) {
    redirect('/');
  }

  console.log(tokens)

  return (
    <div className="w-full min-h-screen font-poppins bg-light text-dark">
      <NavBar isAuthenticated={true}></NavBar>
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
