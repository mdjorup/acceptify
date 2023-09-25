import { Database } from '@/types/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Acceptify',
};

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // users who are logged in should not be able to log in again
    redirect('/home');
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background pb-40">
      {children}
    </div>
  );
};

export default AuthLayout;
