import Link from 'next/link';

const Page = async () => {
  return (
    <div>
      <p>This is a test of the landing page.</p>
      <Link href="/home">Dashboard</Link>
    </div>
  );
};

export default Page;
