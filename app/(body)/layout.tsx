import { Header } from '@/components/Header';
import { Database } from '@/shared/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Acceptify',
};

export default async function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // this route is protected

  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login');
  }

  if (session.user.email_confirmed_at === null) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/confirm-email');
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <Header session={session} />
      {children}
    </div>
  );
}
