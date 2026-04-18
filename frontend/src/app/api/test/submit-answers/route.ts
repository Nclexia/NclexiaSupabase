import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { practice_session, used_questions } = body;
console.log(practice_session ,'practice_session, used_questions ', used_questions )
    const { data: sessionData, error: sessionError } = await supabase
      .from('practice_session')
      .insert({
        user_id: practice_session.user_id,
        total_questions: practice_session.total_questions,
        correct_answers: practice_session.correct_answers,
        score: practice_session.score,
        subject: practice_session.subject,
        ques_type: practice_session.ques_type,
      })
      .select('id')
      .single();

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 400 });
    }

    const practice_session_id = sessionData.id;
    const now = new Date().toISOString();

    const updatedAttempts = used_questions.map((attempt: any) => ({
      user_id: attempt.user_id,
      question_id: attempt.question_id,
      attempt_number: attempt.attempt_number,
      selected_option: attempt.selected_option,
      correct_option: attempt.correct_option,
      practice_session_id,
      is_correct: attempt.is_correct,
      attempted_at: now,
      subject: attempt.subject,
      system: attempt.system,
      time_taken_secs: attempt.time_taken_secs,
      total: attempt.total,
      obtain: attempt.obtain,
    }));

    const { data, error } = await supabase
      .from('used_questions')
      .insert(updatedAttempts);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}