'use client'
import { useState } from 'react';
import { QuestionType, QuestionData } from "@/app/types";
import ErrorModal from "@/components/gui/ErrorModal";

type QuizFormProps = {
    type: QuestionType;
    onSubmit: (data: QuestionData) => void;
};

const MultiRatingForm = ({ type, onSubmit }: QuizFormProps) => {
    const [error, setError] = useState<string | null>(null);

    const [question, setQuestion] = useState('');
    const [lab, setLab] = useState('');

    // Dynamic rows (items)
    const [items, setItems] = useState<string[]>([""]);

    // Dynamic columns (rating scale)
    const [choices, setChoices] = useState<string[]>([""]);

    // Actual ratings: { item: selectedChoice }
    const [ratings, setRatings] = useState<Record<string, string>>({});

    const [rationale, setRationale] = useState('');

    // ------ Dynamic Items ------
    const handleItemChange = (index: number, value: string) => {
        const updated = [...items];

        const oldItem = updated[index];
        updated[index] = value;

        // Preserve rating when renaming row
        if (ratings[oldItem]) {
            const updatedRatings = { ...ratings };
            updatedRatings[value] = updatedRatings[oldItem];
            delete updatedRatings[oldItem];
            setRatings(updatedRatings);
        }

        setItems(updated);
    };

    const addItem = () => setItems([...items, ""]);
    const removeItem = (index: number) => {
        const updated = [...items];

        // remove rating tied to that row
        delete ratings[items[index]];

        updated.splice(index, 1);
        setItems(updated);
    };

    // ------ Dynamic Choices ------
    const handleChoiceChange = (index: number, value: string) => {
        const updated = [...choices];
        updated[index] = value;
        setChoices(updated);
    };

    const addChoice = () => setChoices([...choices, ""]);
    const removeChoice = (index: number) => {
        const updated = [...choices];
        updated.splice(index, 1);
        setChoices(updated);

        // Remove ratings that used this choice
        const updatedRatings = { ...ratings };
        Object.keys(updatedRatings).forEach(item => {
            if (updatedRatings[item] === choices[index]) {
                updatedRatings[item] = "";
            }
        });
        setRatings(updatedRatings);
    };

    // ------ Handle rating selection ------
    const handleRating = (item: string, choice: string) => {
        setRatings(prev => ({ ...prev, [item]: choice }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!question || items.length === 0 || !rationale || Object.values(ratings).includes("")) {
            setError("Please fill out all fields and select ratings.");
            return;
        }
        const jsonFormat = [ratings]; 
      //  const formattedItems = items.map((it, idx) => `${idx + 1}. ${it}`).join(", ");
        let options = [items,choices]
       
        const data: QuestionData = {
            ques: question,
            opt: options,
            ans: jsonFormat, 
            rationale,
            format: type,
            lab
        };

        console.log("Dynamic Matrix Output:", data);
         onSubmit(data)
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="m-5">
                {/* BASIC FIELDS */}
                <div>
                    <label>Question:</label><br />
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                        className="text-field m-3"
                        rows={5}
                        cols={80}
                    />
                </div>

                <div>
                    <label>Lab:</label><br />
                    <textarea
                        value={lab}
                        onChange={(e) => setLab(e.target.value)}
                        className="text-field m-3"
                        rows={5}
                        cols={80}
                    />
                </div>


                {/* MULTI-RATING SCALE */}
                <section className="m-6 p-6 border rounded-xl shadow-md max-w-4xl">
                    <h2 className="text-xl font-bold mb-4">Dynamic Multiple Rating Scale</h2>

                    {/* --- COLUMN EDITOR --- */}
                    <h3 className="font-semibold mb-2">Rating Choices</h3>

                    {choices.map((choice, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                value={choice}
                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                placeholder="Choice (e.g. 1, Good, True)"
                                className="h-10 px-3 rounded w-60 text-black"
                                required
                            />
                            {choices.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeChoice(index)}
                                    className="text-red-400 ml-2"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button type="button" onClick={addChoice} className="button-primary mb-5">
                        Add Choice
                    </button>

                    {/* --- TABLE --- */}
                    <table className="w-full border-collapse mt-4">
                        <thead>
                            <tr>
                                <th className="py-2 text-left">Item</th>
                                {choices.map((c, i) => (
                                    <th key={i} className="text-center">{c}</th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border-t border-neutral-700">
                                    <td className="py-3">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleItemChange(index, e.target.value)}
                                            className="h-10 px-3 rounded w-60 text-black"
                                            placeholder="Item name"
                                            required
                                        />
                                    </td>

                                    {choices.map((choice, cIndex) => (
                                        <td key={cIndex} className="text-center">
                                            <input
                                                type="radio"
                                                name={`rating-${index}`}
                                                checked={ratings[item] === choice}
                                                onChange={() => handleRating(item, choice)}
                                                className="h-4 w-4 accent-blue-500"
                                            />
                                        </td>
                                    ))}

                                    <td className="text-right pl-3">
                                        {items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="text-red-400 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button type="button" onClick={addItem} className="button-primary mt-4">
                        Add Item
                    </button>
                </section>

                {/* RATIONALE */}
                <div>
                    <label>Rationale:</label><br />
                    <textarea
                        value={rationale}
                        onChange={(e) => setRationale(e.target.value)}
                        required
                        className="text-field m-3"
                        rows={5}
                        cols={80}
                    />
                </div>

                <button type="submit" className="button-success m-3">Save</button>
            </form>

            <ErrorModal
                open={!!error}
                onClose={() => setError(null)}
                message={error || ""}
            />
        </div>
    );
};

export default MultiRatingForm;
