import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: '400',
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
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
