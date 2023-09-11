import { Header } from '@/components/Header';

export const metadata = {
  title: 'Acceptify',
};

export default function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <Header />
      {children}
    </div>
  );
}
