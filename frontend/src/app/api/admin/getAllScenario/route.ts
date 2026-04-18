import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase/admin';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get('limit') ?? 10);
    const offset = Number(searchParams.get('offset') ?? 0);

    // data query
    const { data, error } = await supabaseAdmin
      .from('scenario')
      .select('*')
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { data: [], total: 0, error: error.message },
        { status: 400 }
      );
    }

    // count query
    const { count, error: countError } = await supabaseAdmin
      .from('scenario')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      return NextResponse.json(
        { data: [], total: 0, error: countError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      data,
      total: count ?? 0,
    });

  } catch (err) {
    return NextResponse.json(
      { data: [], total: 0, error: 'Server error' },
      { status: 500 }
    );
  }
}