import { Database } from '@/shared/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ReviewsTable, { ReviewWithRelations } from './ReviewsTable';

const AllReviewsPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login');
  }
  const user = session.user;

  let reviews: ReviewWithRelations[] = [];

  let errorMessage = '';

  const user_id = user.id;

  // fetch all reviews for the given user

  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
    id,
    created_at,
    essay_content,
    prompt_id,
    user_id,
    general_feedback,
    status,
    prompt: prompts (
      id,
      prompt_text,
      schools: schools (
        id,
        official_name
      )
    )
  `,
    )
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .limit(20);

  if (data === null) {
    errorMessage = 'No reviews found';
  } else {
    reviews = data;
  }

  return (
    <div>
      <ReviewsTable reviews={reviews} />
    </div>
  );
};

export default AllReviewsPage;
