"use client";
// DragDropQuestion from "./dragDrop";
import { DetailAnswer } from '@/app/types';
import React, { useEffect, useRef, useState } from "react";
import { Check, X } from 'lucide-react';
interface QuestionRendererProps {
    question: DetailAnswer;

}
export default function QuestionRenderer({ question }: QuestionRendererProps) {


    const { format, question_id, selected_option, correct_option, rationale, opt, time_taken_secs } = question;

    if (format === "Single") {
        const optionsArray = opt.split(/,\s*\n?|\n/);
        return (
            <>
                <div>
                    {optionsArray.map((option) => {
                        const value = option.split('.')[0];
                        return (
                            <div key={option} className="my-2 ">
                                <input
                                    type="radio"
                                    name={`q-${question_id}`}
                                    value={value}
                                    className="custom-radio"
                                    checked={value === selected_option[0]}
                                    readOnly

                                />
                                {option}
                            </div>
                        );
                    })}


                    <div className="mt-4">
                        <h6 className="my-5" style={{ display: 'inline' }}>Time taken: </h6>
                        <strong>{time_taken_secs} secs </strong>
                        <p className="h6 mb-0" >
                            Correct Answer:   <strong className="ms-2">{correct_option}</strong>

                        </p>
                    </div>

                    <div className="mt-3">
                        <h6>Rationale:</h6>
                        <p>{rationale}</p>
                    </div>
                </div>
            </>
        );
    }


    if (format === "Multiple") {

        const optionsArray = opt?.split(/,\s*\n?|\n/).map((o) => o.trim()) || [];

        return (
            <div>
                {optionsArray.map((option, index) => {

                    const letter = option.split('.')[0].trim();
                    const label = option.trim();
                    const isChecked = selected_option.includes(letter);

                    return (
                        <div key={index}>

                            <input
                                type="checkbox"

                                value={letter}
                                checked={isChecked}
                                onChange={(e) => {
                                    const checked = e.target.checked;


                                    let updatedAnswer: string | string[] = '';

                                    if (checked) {
                                        // Add the letter
                                        updatedAnswer = [...selected_option, letter]
                                            .filter((v, i, self) => self.indexOf(v) === i) // remove duplicates
                                            .sort()
                                            .join('');
                                    }
                                    else {
                                        if (typeof selected_option === 'string') {
                                            updatedAnswer = selected_option
                                                .split('')
                                                .filter((v) => v !== letter)
                                                .sort()
                                                .join('');
                                        }

                                    }
                                }}
                            />


                            {label}
                        </div>
                    )
                })}
                <h6 className="my-5" style={{ display: 'inline' }}>Time taken: </h6>
                <strong>{time_taken_secs} secs </strong>
                <h6 className="my-5" style={{ display: 'inline' }}>Correct Answer: </h6>
                <strong>{correct_option}</strong>

                <h6 className="mt-2">Rationale:</h6>
                <p>{rationale}</p>
            </div>)
    }

    if (format === "Dropdown") {
        const parts = question.ques?.split(/({{blank:.*?}})/g) || [];
        let selected: string[] = [];
        if (selected_option) {
            if (Array.isArray(selected_option)) selected = selected_option;
            else if (typeof selected_option === "object") selected = Object.values(selected_option);
        }

        let correctAnswers: string[] = [];
        if (correct_option) {
            if (Array.isArray(correct_option)) correctAnswers = correct_option;
            else if (typeof correct_option === "object") correctAnswers = Object.values(correct_option);
        }

        return (
            <div>
                <div className="leading-8 flex flex-wrap gap-2">
                    {parts.map((part, i) => {
                        const match = part.match(/{{blank:(\d+):(.*?)}}/);

                        if (match) {
                            const blankIndex = parseInt(match[1], 10);
                            const optionsRaw = match[2];
                            const options = optionsRaw.split(",");

                            const userAns = selected[blankIndex];
                            const correct = correctAnswers[blankIndex];
                            const isCorrect =
                                userAns?.trim().toLowerCase() === correct?.trim().toLowerCase();

                            return (
                                <div className="flex items-center gap-2" key={i}>
                                    <select
                                        key={i}
                                        value={userAns ?? ""}
                                        onChange={() => { }}
                                        className={`border rounded px-2 py-1 cursor-default font-medium`}
                                    >
                                        {/* Default option if not selected */}
                                        <option value="" disabled>
                                            Select option
                                        </option>

                                        {options.map((opt, idx) => (
                                            <option key={idx} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>

                                    {userAns ? (
                                        isCorrect ? (
                                            <span className="text-green-600 font-bold">
                                                <Check />
                                            </span>
                                        ) : (
                                            <span className="text-red-600 font-bold">
                                                <X />
                                            </span>
                                        )
                                    ) : (
                                        <span className="text-gray-400 italic text-sm">
                                            (Not selected)
                                        </span>
                                    )}
                                </div>
                            );
                        }

                        return <span key={i}>{part}</span>;
                    })}
                </div>

                <h6 className="my-5 inline">Time taken: </h6>
                <strong>{time_taken_secs} secs</strong>

                <h6 className="mt-2">Rationale:</h6>
                <p>{rationale}</p>
            </div>
        );
    }

    if (format === "Highlight") {
        const [tokens, setTokens] = useState<string[]>([]);
        const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
        const highlightColor = "#ffd54f";

        // Split question text into tokens
        useEffect(() => {
            const tokenList = question.ques.split(/(\s+|[.!?,;]+)/g).filter(Boolean);
            setTokens(tokenList);
        }, [question.ques]);

        useEffect(() => {
            if (!selected_option?.length || !tokens.length) return;

            const selectedText = selected_option[0];
            const joined = tokens.join("");
            const start = joined.indexOf(selectedText);

            if (start !== -1) {
                let charCount = 0;
                const indices: number[] = [];

                tokens.forEach((t, i) => {
                    const tokenStart = charCount;
                    const tokenEnd = charCount + t.length;

                    if (tokenEnd > start && tokenStart < start + selectedText.length) {
                        indices.push(i);
                    }

                    charCount += t.length;
                });

                setSelectedIndices(indices);
            }
        }, [selected_option, tokens]);


        return (
            <div>
                {tokens.map((t, i) => {
                    const isSpace = /^\s+$/.test(t);
                    const isSelected = selectedIndices.includes(i);
                    return isSpace ? (
                        <span key={i}>{t}</span>
                    ) : (
                        <span
                            key={i}
                            className={`cursor-text px-1 rounded transition-colors duration-150 ${isSelected ? "text-black" : "text-gray-800"
                                }`}
                            style={{
                                backgroundColor: isSelected ? highlightColor : "transparent",
                            }}
                        >
                            {t}
                        </span>
                    );
                })}

                {selectedIndices.length > 0 && (
                    <div className="mt-3 p-2 bg-gray-50 border rounded text-sm text-gray-700">
                        <strong>Selected Answer:</strong>{" "}
                        {selectedIndices.map((i) => tokens[i]).join("")}
                    </div>
                )}
                <h6 className="my-5" style={{ display: 'inline' }}>Time taken: </h6>
                <strong>{time_taken_secs} secs </strong>
                <div className="mt-4">
                    <span className="h6 mb-0" style={{ display: 'inline' }}>
                        Correct Answer:
                    </span>
                    <strong className="ms-2">{correct_option}</strong>
                </div>
                <h6 className="mt-2">Rationale:</h6>
                <p>{rationale}</p>
            </div>
        );
    }

    if (format === "Multi Rating") {

        const convertPgArray = (pgString: any) => {
            if (!pgString) return [];

            try {
                const jsonReady = pgString
                    .replace(/{/g, '[')
                    .replace(/}/g, ']');

                return JSON.parse(jsonReady);
            } catch (e) {
                console.error("Invalid Postgres array:", pgString);
                return [];
            }
        };
        const nestedArray = convertPgArray(opt);
        const selected = selected_option?.[0] ;
        const correct_opt = correct_option?.[0] ;

        return (
            <>
                <div>
                    <div style={{ display: "table", borderSpacing: "10px" }}>
                        {/* Header Row */}
                        <div style={{ display: "table-row", fontWeight: "bold" }}>
                            <div style={{ display: "table-cell", textAlign: "center" }}></div>
                            {nestedArray[1].map((rating: any) => (
                                <div key={rating} style={{ display: "table-cell", textAlign: "center" }}>
                                    {rating}
                                </div>
                            ))}
                        </div>
                        {nestedArray[0].map((option: any) => (
                            <div key={option} style={{ display: "table-row" }}>
                                <div style={{ display: "table-cell" }}>{option}</div>

                                {nestedArray[1].map((rating: any) => (
                                    <div
                                        key={rating}
                                        style={{ display: "table-cell", textAlign: "center" }}
                                    >
                                        <input
                                            type="radio"
                                            name={`selected-${question_id}-${option}`}
                                            value={rating}

                                            style={{ pointerEvents: "none" }}
                                            checked={String(selected[option]) === String(rating)}
                                            readOnly
                                        // disabled={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>

                    <div className="mt-4">
                        <h6 className="my-5" style={{ display: 'inline' }}>
                            Time taken:
                        </h6>
                        <strong>{time_taken_secs} secs</strong>

                        <p className="h6 mb-0">Correct Answer:</p>
                        <div style={{ display: "table", borderSpacing: "10px" }}>
                            <div style={{ display: "table-row", fontWeight: "bold" }}>

                                <div style={{ display: "table-cell", textAlign: "center" }}></div>
                                {nestedArray[1].map((rating: any) => (
                                    <div key={rating} style={{ display: "table-cell", textAlign: "center" }}>
                                        {rating}
                                    </div>
                                ))}
                            </div>
                            {nestedArray[0].map((option: any) => (
                                <div key={option} style={{ display: "table-row" }}>
                                    <div style={{ display: "table-cell" }}>{option}</div>

                                    {nestedArray[1].map((rating: any) => (
                                        <div
                                            key={rating}
                                            style={{ display: "table-cell", textAlign: "center" }}
                                        >
                                            <input
                                                type="radio"
                                                name={`correct-${question_id}-${option}`}
                                                value={rating}
                                                readOnly
                                                checked={String(correct_opt[option]) === String(rating)}
                                                style={{ pointerEvents: "none" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-3">
                        <h6>Rationale:</h6>
                        <p>{rationale}</p>
                    </div>
                </div>
            </>
        );

    }
    return <div>Unsupported question type</div>;
}
