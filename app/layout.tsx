import { ClerkProvider } from '@clerk/nextjs';
import { Noto_Sans_Display } from 'next/font/google';
import { Providers } from './providers';

import './globals.css';

export const metadata = {
  title: 'Acceptify',
};

const inter = Noto_Sans_Display({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
