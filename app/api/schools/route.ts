import { Database } from '@/shared/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.from('schools').select('*');

  if (error != null) {
    return Response.error();
  }

  return Response.json({ data });
}
