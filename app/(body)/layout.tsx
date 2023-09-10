import Header from '@/components/Header';

export const metadata = {
  title: 'Acceptify',
};

export default function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
