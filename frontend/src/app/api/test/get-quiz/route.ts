import { NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/client';
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      limit = 10,
      offset = 0,
      systems = [],
      subjects = [],
      types = [],
    } = body;

    let query = supabase
      .from('questions')
      .select(`
        id,
        ques,
        opt,
        ans,
        rationale,
        format,
        scenario_id,
        scenario (
          id,
          scenario,
          subject,
          system,
          type,
          score
        )
      `)
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);

    if (systems.length > 0) {
      query = query.in('scenario.system', systems);
    }

    if (subjects.length > 0) {
      query = query.in('scenario.subject', subjects);
    }

    if (types.length > 0) {
      query = query.in('scenario.type', types);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { data: [], total: 0, error: error.message },
        { status: 400 }
      );
    }

    const { count } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    // const flattenedData = (data ?? []).map((q) => ({
    //   question_id: q.id,
    //   ques: q.ques,
    //   opt: q.opt,
    //   ans: q.ans,
    //   rationale: q.rationale,
    //   format: q.format,
    //   scenario_id: q.scenario_id,
    //   // Flatten scenario fields onto the question object
    //   scenario: q.scenario?.scenario ?? null,   // <-- now a string, not an object
    //   subject: q.scenario?.subject ?? '',
    //   system: q.scenario?.system ?? '',
    //   type: q.scenario?.type ?? '',
    //   score: q.scenario?.score ?? 0,
    // }));
    const q = data as any;
    const s = Array.isArray(q?.scenario) ? q.scenario[0] : q?.scenario;

    const flat = {
      question_id: q.id,
      ques: q.ques,
      opt: q.opt,
      ans: q.ans,
      rationale: q.rationale,
      format: q.format,
      scenario_id: q.scenario_id,
      // Flatten scenario fields onto the question object
      scenario: q.scenario?.scenario ?? null,   // <-- now a string, not an object
      subject: q.scenario?.subject ?? '',
      system: q.scenario?.system ?? '',
      type: q.scenario?.type ?? '',
      score: q.scenario?.score ?? 0,
    };

    return NextResponse.json({
      data: flat,
      total: count ?? 0,
    });
    // return NextResponse.json({
    //   data,
    //   total: count ?? 0,
    // });

  } catch (err) {
    return NextResponse.json(
      { data: [], total: 0, error: 'Server error' },
      { status: 500 }
    );
  }
}