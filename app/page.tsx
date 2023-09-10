import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const checkUserLoggedIn = async (): Promise<boolean> => {
  const user = await currentUser();

  if (user) {
    return true;
  }
  return false;
};
const Page = async () => {
  const isLoggedIn = await checkUserLoggedIn();

  if (isLoggedIn) {
    redirect('/dashboard');
  }

  return (
    <div>
      <p>This is a test of the landing page.</p>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Page;
