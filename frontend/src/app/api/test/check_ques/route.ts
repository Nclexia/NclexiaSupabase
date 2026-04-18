import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/client';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id')
    const ques_id = searchParams.get('ques_id')

    const { data, error } = await supabase
      .from('used_questions')
      .select(`
        id,
        correct_option,
        selected_option,
        time_taken_secs,
        question:questions (
          id,
          ques,
          opt,
          rationale,
          format,
          scenario_id,
          scenario (
            scenario
          )
        )
      `)
      .eq('id', id)
      .eq('question_id', ques_id)
      .single();

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 400 });
    }
    const q = data.question as any;
    const s = Array.isArray(q?.scenario) ? q.scenario[0] : q?.scenario;

    const flat = {
      used_question_id: data.id,
      correct_option: data.correct_option,
      selected_option: data.selected_option,
      time_taken_secs: data.time_taken_secs,
      question_id: q?.id ?? null,
      ques: q?.ques ?? null,
      opt: q?.opt ?? null,
      rationale: q?.rationale ?? null,
      format: q?.format ?? null,
      scenario_id: q?.scenario_id ?? null,
      scenario: s?.scenario ?? null,
    };

    return NextResponse.json({ data: flat });
  } catch (err) {
    return NextResponse.json({ data: null, error: 'Server error' }, { status: 500 });
  }
}