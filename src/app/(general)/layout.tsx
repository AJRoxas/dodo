import NavBar from '@/components/Navbar';

const GeneralLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full min-h-screen font-poppins bg-light text-dark">
      <NavBar isAuthenticated={false}></NavBar>
      {children}
    </div>
  );
};

export default GeneralLayout;
