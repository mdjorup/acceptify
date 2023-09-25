import { Database } from '@/shared/supabase';
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
    error,
  } = await supabase.auth.getSession();

  if (session !== null) {
    redirect('/home');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pb-40">
      {children}
    </div>
  );
};

export default AuthLayout;
