import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/client';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get('user_id')
        const practice_session_id = Number(searchParams.get('practice_session_id'));

        const { data, error } = await supabase
            .from('practice_session')
            .select('score, total_questions, correct_answers')
            .eq('user_id', user_id)
            .eq('id', practice_session_id)
            .single();

        if (error) {
            return NextResponse.json({ data: null, error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json({ data: null, error: 'Server error' }, { status: 500 });
    }
}