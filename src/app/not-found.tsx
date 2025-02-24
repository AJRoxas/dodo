import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-regular-svg-icons';

const NotFound = () => {
  return (
    <div className="flex justify-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-poppins bg-linear-to-b from-primary to-secondary text-light">
      <main className="flex flex-col justify-center justify-items-center w-72 sm:w-144">
        <FontAwesomeIcon
          icon={faFaceSadTear}
          className="h-40! w-full fill-light"
        />
        <div className="text-center w-full">
          <div className="font-semibold text-6xl my-4">
            <div className="text-6xl">404</div>
            <div className="text-4xl">Whoops... page not found</div>
          </div>
        </div>
        <div className="text-center w-full">
          The page probably doesn&apos;t exist. You can head back to the{' '}
          <Link href="/">
            <u>Homepage</u>{' '}
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
