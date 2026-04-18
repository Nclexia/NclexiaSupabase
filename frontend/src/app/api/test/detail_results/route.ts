import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/client';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const user_id = searchParams.get('user_id')
        const practice_session_id = Number(searchParams.get('practice_session_id'));
        const limit = Number(searchParams.get('limit') ?? 10);
        const offset = Number(searchParams.get('offset') ?? 0);

        const [{ data, error }, { count, error: countError }] = await Promise.all([
            supabase
                .from('used_questions')
                .select('*')
                .eq('user_id', user_id)
                .eq('practice_session_id', practice_session_id)
                .order('id', { ascending: false })
                .range(offset, offset + limit - 1),
            supabase
                .from('used_questions')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user_id)
                .eq('practice_session_id', practice_session_id),
        ]);

        if (error || countError) {
            return NextResponse.json({ data: [], total: 0, error: error?.message }, { status: 400 });
        }

        const formattedData = (data ?? []).map((row) => ({
            ...row,
            formatted_date: row.attempted_at
                ? new Date(row.attempted_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })
                : null,
        }));

        return NextResponse.json({ data: formattedData, total: count ?? 0 });
    } catch (err) {
        return NextResponse.json({ data: [], total: 0, error: 'Server error' }, { status: 500 });
    }
}