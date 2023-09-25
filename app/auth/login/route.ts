import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  requestUrl.pathname;
  if (error) {
    console.log(error);
    return NextResponse.redirect(requestUrl.origin + '/login', {
      status: 301,
    });
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
