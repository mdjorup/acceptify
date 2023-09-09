import { ClerkProvider } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/react';
import { Noto_Sans_Display } from 'next/font/google';

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
      <NextUIProvider>
        <html lang="en" className={inter.className}>
          <body>{children}</body>
        </html>
      </NextUIProvider>
    </ClerkProvider>
  );
}
