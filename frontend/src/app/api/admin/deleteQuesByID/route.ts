import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase/admin';

export async function DELETE(req: Request) {
  try {
    const { ques_id } = await req.json();

    if (!ques_id) {
      return NextResponse.json(
        { error: 'ques_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('questions')
      .delete()
      .eq('id', ques_id)
      .select('id');

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}