import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ToastProvider from '@/context/ToastContext';
config.autoAddCss = false;

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Dodo',
  description: 'The Easy Tracking App',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/favicon-light.png',
        href: '/images/favicon-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/favicon-dark.png',
        href: '/images/favicon-dark.png',
      },
    ],
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ToastProvider>
          <div className="w-full min-h-screen font-poppins bg-light text-dark">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
};

export default RootLayout;
