import NavBar from '@/components/Navbar';

const AuthenticatedLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <NavBar isAuthenticated={true}></NavBar>
      {children}
    </>
  );
};

export default AuthenticatedLayout;
