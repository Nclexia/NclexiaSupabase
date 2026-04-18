import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase/admin';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { user_id, is_active } = body;

    console.log(user_id, is_active);

    if (!user_id) {
      return NextResponse.json(
        { error: 'user_id is required' },
        { status: 400 }
      );
    }

    // ✅ Supabase update (correct place)
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ is_active: is_active })
      .eq('id', user_id)
      .select('id, is_active')
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ data });

  } catch (err) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}