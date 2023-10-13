import { Database } from '@/shared/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } },
) {
  const user_id = params.user_id;

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.getUser();

  const user = data.user;

  if (error != null || user == null) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requesting_user_id = user.id;

  if (requesting_user_id !== user_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { data: reviewsData, error: reviewsError } = await supabase
    .from('reviews')
    .select()
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .limit(20);

  if (reviewsError != null) {
    return NextResponse.json({ error: reviewsError }, { status: 500 });
  }

  return NextResponse.json(reviewsData, { status: 200 });
}
