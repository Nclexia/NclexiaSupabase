import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase/admin';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get('limit') ?? 10);
    const offset = Number(searchParams.get('offset') ?? 0);

    const { data, error } = await supabaseAdmin
      .from('questions')
      .select('*')
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const { count } = await supabaseAdmin
      .from('questions')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      data,
      total: count ?? 0,
    });

  } catch (err) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}