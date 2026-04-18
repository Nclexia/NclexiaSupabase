import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/client';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get('user_id')
        const limit = Number(searchParams.get('limit') ?? 10);
        const offset = Number(searchParams.get('offset') ?? 0);

        const [{ data, error }, { count, error: countError }] = await Promise.all([
            supabase
                .from('practice_session')
                .select('*')
                .eq('user_id', user_id)
                .order('id', { ascending: false })
                .range(offset, offset + limit - 1),
            supabase
                .from('practice_session')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user_id),
        ]);

        if (error || countError) {
            return NextResponse.json({ data: [], total: 0, error: error?.message }, { status: 400 });
        }

        const formattedData = (data ?? []).map((row) => ({
            ...row,
            score: row.score + '%',
            formatted_date: new Date(row.session_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        }));

        return NextResponse.json({ data: formattedData, total: count ?? 0 });
    } catch (err) {
        return NextResponse.json({ data: [], total: 0, error: 'Server error' }, { status: 500 });
    }
}