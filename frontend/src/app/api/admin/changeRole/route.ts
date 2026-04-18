import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase/admin';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { user_id, role } = body;

    console.log("INPUT:", user_id, role);

    if (!user_id || !role) {
      return NextResponse.json(
        { error: 'user_id and role are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ role })
      .eq('id', user_id)
      .select('id, role')
      .single();

    if (error) {
      console.log("SUPABASE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ data });

  } catch (err) {
    console.log("SERVER ERROR:", err);

    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}