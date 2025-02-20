import Logo from '../../public/dodo-title.svg';

export default function Home() {
  return (
    <div className="flex justify-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-poppins bg-linear-to-b from-primary to-secondary text-light">
      <main className="flex flex-col justify-center justify-items-center w-72 sm:w-144">
        <Logo className="h-20 sm:h-40 w-full fill-light" />
        <div className="font-semibold text-6xl my-4 text-center w-full">
          Coming Soon
        </div>
        <div className="text-center w-full">
          -Update: Feb 2025-
          <br />
          Thanks for visiting! I’m at the early stages of this project and I
          hope to share more in the near future!
          <br />
          <br />
          You can visit the
          <a href="https://github.com/AJRoxas/dodo"> <u>Dodo repository</u></a> to learn more about this project!
          <br />
          -AJRox-
        </div>
      </main>
    </div>
  );
}
