import { SQSFactory } from '@/services/sqs';
import { Database } from '@/shared/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// start a new review
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.getUser();

  const user = data.user;

  if (error != null || user == null) {
    return Response.error();
  }

  const user_id = user.id;
  const school_id = Number(formData.get('school_id'));
  const prompt_id = Number(formData.get('prompt_id'));
  const essay_content = String(formData.get('essay_content'));

  // validate to make sure all fields aren't null
  if (
    user_id == null ||
    school_id == null ||
    prompt_id == null ||
    essay_content == null
  ) {
    return Response.error();
  }

  // insert into reviews table, then get review id
  // TODO: insert other information about the review as well

  const { data: review_data, error: review_error } = await supabase
    .from('reviews')
    .insert({
      user_id,
      prompt_id,
      essay_content,
      status: 'pending',
    })
    .select()
    .single();

  if (review_error != null || review_data == null) {
    return Response.error();
  }

  const review_id = review_data.id;

  const sqs = SQSFactory.create();

  // send to SQS queue
  const queue_params = {
    QueueUrl: process.env.SQS_QUEUE_URL ?? '',
    MessageBody: JSON.stringify({ review_id: review_id }),
  };

  const { MessageId } = await sqs.sendMessage(queue_params);

  return Response.json({
    data: {
      ...review_data,
      MessageId,
    },
    error: review_error,
  });
}
