import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase/admin';

export async function POST(req: Request) {
    try {
        const { scenario, subject, system, type, score, questionBlocks } = await req.json();

        // Insert scenario
        const { data: scenarioData, error: scenarioError } = await supabaseAdmin
            .from('scenario')
            .insert({ scenario, subject, system, type, score })
            .select('id')
            .single();

        if (scenarioError) throw scenarioError;

        const scenario_id = scenarioData.id;

        // Build questions payload
        const questions = questionBlocks
            .filter((block: any) => block?.data)
            .map((block: any) => {
                const { ques, opt, ans, rationale, format, lab } = block.data;
                return {
                    scenario_id,
                    ques,
                    opt,
                    ans,
                    rationale,
                    format,
                    lab: lab?.trim() ? lab : null,
                };
            });

        const { error: questionsError } = await supabaseAdmin
            .from('questions')
            .insert(questions);

        if (questionsError) {
            // Rollback: delete the scenario we just inserted
            await supabaseAdmin.from('scenario').delete().eq('id', scenario_id);
            throw questionsError;
        }

        return NextResponse.json({ success: true, scenario_id });
    } catch (err) {
        console.error('Error inserting quiz question:', err);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}