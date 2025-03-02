const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="flex flex-col justify-center items-center p-10 sm:p-20 max-w-px-300 min-h-full gap-8">
      {children}
    </main>
  );
};

export default AuthLayout;
