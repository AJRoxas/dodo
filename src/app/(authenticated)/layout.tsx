import NavBar from '@/components/Navbar';

const AuthenticatedLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full min-h-screen font-poppins bg-light text-dark">
      <NavBar isAuthenticated={true}></NavBar>
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
