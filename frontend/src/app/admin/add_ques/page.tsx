'use client'

import { useEffect, useState } from 'react'
import QuizForm from './QuizForm';
import HighlightForm from './HighlightForm';
import DropDown from './DropDown';
import MultiRatingForm from './MultiRatingForm';
import { subjects, systems, types } from './categories';
import { v4 as uuidv4 } from 'uuid';
import { QuestionType, QuestionData, QuestionBlock } from "@/app/types";
import ErrorModal from "@/components/gui/ErrorModal";


export default function UsersPage() {

    const [subject, setSubject] = useState('Adult Health');
    const [system, setSystem] = useState('Cardiovascular');
    const [scenario, setScenario] = useState('');
    const [type, setType] = useState('Tradition');

    const [questionBlocks, setQuestionBlocks] = useState<QuestionBlock[]>([]);
    const [score, setScore] = useState('');
    const QuesType = ['Single', 'Multiple', "Dropdown", "Highlight", "Multi Rating"];
    const [error, setError] = useState<string | null>(null)

    //  Add a new question block
    const handleAddQuestionClick = () => {
        const newBlock: QuestionBlock = {
            id: uuidv4(),
            type: '',
            showForm: false,
            data: undefined,
        };
        setQuestionBlocks(prev => [...prev, newBlock]);
    };


    const handleTypeChange = (id: string, type: QuestionType) => {
        setQuestionBlocks(prev =>
            prev.map(block =>
                block.id === id ? { ...block, type, showForm: true } : block
            )
        );
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') {
            setScore('');
            return;
        }

        if (/^[1-9]\d*$/.test(value)) setScore(value);

    };

    const handleFormSubmit = (id: string, formData: QuestionData) => {
        setQuestionBlocks(prev =>
            prev.map(block =>
                block.id === id
                    ? { ...block, data: formData }
                    : block
            )
        );

    };
    const saveAll = async () => {

        if (!scenario?.trim()) return setError('Scenario is required.');
        if (!subject?.trim()) return setError('Subject is required.');
        if (!system?.trim()) return setError('System is required.');
        if (!type?.trim()) return setError('Type is required.');
        if (!score) return setError('Score is required.');

        if (questionBlocks.length === 0) return setError('Add at least one question block.');
        for (let i = 0; i < questionBlocks.length; i++) {
            if (questionBlocks[i]?.data == null) {
                return setError(`Please click Save on question ${i + 1} before submitting.`);
            }
        }

        const quizQuestion = { scenario, subject, system, type, score, questionBlocks };

        try {
            const res = await fetch(`/api/admin/quiz/add-quiz`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quizQuestion),
            });

            let data = null;
            try {
                data = await res.json();
            } catch {
                const text = await res.text();
                alert(text || `Invalid server response (status ${res.status})`);
                return;
            }

            if (!res.ok) {
                const message = data?.message || `Request failed (${res.status})`;
                return alert(message);
            }

            alert(data?.message || 'Quiz added successfully');
        } catch (error: any) {
            console.error('Request error:', error);
            alert(error.message || 'Something went wrong');
        }
    };
    return (
        <section className='mx-5 container'>


            <div>
                <label>Type: </label>
                {types.map((option) => (
                    <label key={option}>
                        <input
                            type="radio"
                            name="my-group"
                            value={option}
                            checked={type === option}
                            onChange={() => setType(option)}
                        />
                        {option}
                    </label>
                ))}
            </div>


            <div>
                <label>Select  Subject: </label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className='text-field m-4'>

                    {subjects.map((sub, index) => (
                        <option key={index} value={sub}>
                            {sub}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Select System: </label>
                <select value={system} onChange={(e) => setSystem(e.target.value)} className='text-field m-4'>

                    {systems.map((sys, index) => (
                        <option key={index} value={sys}>
                            {sys}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Score</label>
                <input
                    type="number"
                    name="score"
                    id="score"
                    className="text-field m-4"
                    value={score}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    inputMode="numeric"
                />
            </div>
            <div>
                <label>Scenario :</label><br />
                <textarea
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    required
                    className='text-field m-3'
                    rows={5}
                    cols={80}
                />
            </div>

            <div>

                {/* Render all active question blocks */}
                {questionBlocks.map(block => (
                    <div key={block.id} style={{ border: '1px solid #ccc', padding: '1em', margin: '1em 0' }}>
                        <p>Select Question Type:</p>
                        <div className="radio-group">
                            {QuesType.map(type => (
                                <label key={type} style={{ marginRight: '10px' }}>
                                    <input
                                        type="radio"
                                        name={`QuesType-${block.id}`}
                                        value={type}
                                        checked={block.type === type}

                                        onChange={(e) => {
                                            const value = e.target.value as QuestionType;
                                            handleTypeChange(block.id, value);
                                        }}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>

                        {block.showForm && block.type !== 'Dropdown' && block.type != 'Highlight' && block.type !== 'Multi Rating' && (
                            <div>
                                <h4>{block.type} Question</h4>
                                <QuizForm type={block.type}
                                    onSubmit={(formData) => handleFormSubmit(block.id, formData)} />
                            </div>
                        )}
                        {block.showForm && block.type == 'Dropdown' && (
                            <div>
                                <h4>{block.type} Question</h4>
                                <DropDown type={block.type}
                                    onSubmit={(formData) => handleFormSubmit(block.id, formData)} />
                            </div>
                        )}

                        {block.showForm && block.type == 'Highlight' && (
                            <div>
                                <h4>{block.type} Question</h4>
                                <HighlightForm type={block.type}
                                    onSubmit={(formData) => handleFormSubmit(block.id, formData)} />
                            </div>
                        )}
                        {block.showForm && block.type == 'Multi Rating' && (
                            <div>
                                <h4>{block.type} Question</h4>
                                <MultiRatingForm type={block.type}
                                    onSubmit={(formData) => handleFormSubmit(block.id, formData)} />
                            </div>
                        )}
                    </div>
                ))}

                <button onClick={handleAddQuestionClick} className='button-primary'>Add Question</button>

            </div>

            <button onClick={saveAll} className='m-5  btn btn-success'>Save All</button>
            <ErrorModal
                open={!!error}
                onClose={() => setError(null)}
                message={error || ""}
            />
        </section>


    )
}
