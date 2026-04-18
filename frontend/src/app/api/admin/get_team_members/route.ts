import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import {formatDateTime} from "../DateTime"


export async function GET(req: NextRequest) {
  try {
    const { data, error, count } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact' }) // ✅ gets count in same query
      .neq('role', 'user')             // ✅ replaces WHERE role != 'user'
      .order('id', { ascending: false });

    if (error) throw error;

    const formattedUsers = data?.map(user => ({
      ...user,
      created_at: formatDateTime(user.created_at),
      last_login: user.last_login ? formatDateTime(user.last_login) : null,
    }));

    return NextResponse.json({
      data: formattedUsers,
      total: count ?? 0,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { data: [], total: 0 },
      { status: 500 }
    );
  }
}