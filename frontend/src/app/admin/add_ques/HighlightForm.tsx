'use client'
import { useState } from 'react';
import ErrorModal from "@/components/gui/ErrorModal";
import { QuestionType, QuestionData } from "@/app/types";

type QuizFormProps = {
    type: QuestionType;
    onSubmit: (data: QuestionData) => void;
};

const QuizForm = ({ type, onSubmit }: QuizFormProps) => {
    const [error, setError] = useState<string | null>(null)

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState<string[]>([]);
    const [rationale, setRationale] = useState('');
    const [lab, setLab] = useState('');


    const handleSubmit = async (e: any) => {
        e.preventDefault();


        const data: QuestionData = {
            ques: question,
            ans: answer,
            rationale: rationale,
            format: type,
            lab: lab
        };
        if (
            !data.ques ||
            data.ans.length == 0 ||
            !data.rationale ||
            !data.format
        ) {
            const missingFields = [];
            console.log("data.ans.length ", data.ans.length, data.ans)
            if (!data.ques) missingFields.push("Question text");
            if (data.ans.length == 0) missingFields.push("Answer");
            if (!data.rationale) missingFields.push("Rationale");

            const errorMsg = `Please fill in all required fields: ${missingFields.join(", ")}.`;
            setError(errorMsg)
            return
        }

        onSubmit(data);

    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='m-5'>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Question:</label> <br />
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}

                        className='text-field m-3 w-full border rounded p-2'
                        rows={5}
                        cols={80}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Lab:</label> <br />
                    <textarea
                        value={lab}
                        onChange={(e) => setLab(e.target.value)}

                        className='text-field m-3 w-full border rounded p-2'
                        rows={5}
                        cols={80}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Answer:</label> <br />
                    <textarea
                        value={answer[0]}
                        onChange={(e) => setAnswer([e.target.value])}

                        className='text-field m-3 w-full border rounded p-2'
                        rows={5}
                        cols={20}
                    />
                </div>


                <div className="mb-4">
                    <label className="block font-medium mb-1">Rationale:</label> <br />
                    <textarea
                        value={rationale}
                        onChange={(e) => setRationale(e.target.value)}

                        className='text-field m-3 w-full border rounded p-2'
                        rows={5}
                        cols={80}
                    />
                </div>


                <button type="submit" className='button-success m-3'>Save Highlight data</button>
            </form>
            <ErrorModal
                open={!!error}
                onClose={() => setError(null)}
                message={error || ""}
            />
        </div>
    );
};

export default QuizForm;
