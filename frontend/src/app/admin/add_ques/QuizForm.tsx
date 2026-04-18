'use client'
import { useState } from 'react';
import { QuestionType, QuestionData } from "@/app/types";
import ErrorModal from "@/components/gui/ErrorModal";


type QuizFormProps = {
    type: QuestionType;
    onSubmit: (data: QuestionData) => void;
};

const QuizForm = ({ type, onSubmit }: QuizFormProps) => {
    const [error, setError] = useState<string | null>(null)

    const [question, setQuestion] = useState('');
    const [lab, setLab] = useState('');

    const [options, setOptions] = useState(['']);
    const [answer, setAnswer] = useState<string[]>([]);
    const [rationale, setRationale] = useState('');

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => setOptions([...options, '']);


    const removeOption = (index: number) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleAnswerChange = (option: string) => {
        if (answer.includes(option)) {
            setAnswer(answer.filter((a) => a !== option));
        } else {
            setAnswer([...answer, option]);
        }

    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let final_ans = answer.sort();

        let formattedOptions = options
            .map((opt, index) => `${String.fromCharCode(65 + index)}. ${opt}`)
            .join(", ");

        const data: QuestionData = {
            ques: question,
            opt: formattedOptions,
            ans: final_ans,
            rationale: rationale,
            format: type,
            lab: lab
        };
        if (
            !data.ques ||
            data.ans.length == 0 ||
            !data.rationale ||
            !data.format ||
            !data.opt
        ) {
            const missingFields = [];
            if (!data.ques) missingFields.push("Question text");
            if (data.ans.length == 0) missingFields.push("Answer");
            if (!data.rationale) missingFields.push("Rationale");
            if (!data.opt) missingFields.push("Option");

            const errorMsg = `Please fill in all required fields: ${missingFields.join(", ")}.`;
            setError(errorMsg)
            return
        }
        console.log(data)
        onSubmit(data);


    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='m-5'>


                <div>
                    <label>Question:</label><br />
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                        className='text-field m-3'
                        rows={5}
                        cols={80}
                    />
                </div>
                <div>
                    <label>Lab:</label><br />
                    <textarea
                        value={lab}
                        onChange={(e) => setLab(e.target.value)}

                        className='text-field m-3'
                        rows={5}
                        cols={80}
                    />
                </div>
                <div>
                    <label>Options:</label><br />
                    {options.map((opt, index) => {
                        const label = String.fromCharCode(65 + index);

                        return (
                            <div key={index} className="flex items-center mb-3">
                                <label className="w-6 text-right mr-2 font-bold">{label}.</label>

                                <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    required
                                    className="w-96 h-12 px-4 text-lg border rounded mr-4"
                                    placeholder={`Option ${label}`}
                                />

                                <input
                                    type="checkbox"
                                    checked={answer.includes(label)}
                                    onChange={() => handleAnswerChange(label)}
                                    className="mr-2"
                                />
                                <label>Correct Answer</label>

                                {options.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="ml-4 text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        );
                    })}

                    <button type="button" onClick={addOption} className='button-primary m-3'>Add Option</button>
                </div>

                <div>
                    <label>Rationale:</label><br />
                    <textarea
                        value={rationale}
                        onChange={(e) => setRationale(e.target.value)}
                        required
                        className='text-field m-3'
                        rows={5}
                        cols={80}
                    />
                </div>

                <button type="submit" className='button-success m-3'>Save </button>

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
