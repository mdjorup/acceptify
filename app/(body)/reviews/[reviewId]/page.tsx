import { Database } from '@/shared/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SingleReviewPage = async ({
  params,
}: {
  params: { reviewId: string };
}) => {
  // get the review from supabase

  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user_id = session?.user.id;

  if (user_id == null) {
    redirect('/login');
  }

  return <div>SingleReviewPage {params.reviewId}</div>;
};

export default SingleReviewPage;
