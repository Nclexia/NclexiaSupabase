'use client';

import { useState } from 'react';
import { Type, List, PlusCircle, Trash2, Save, TriangleAlert } from 'lucide-react';

import ErrorModal from "@/components/gui/ErrorModal";

import { QuestionType, QuestionData } from "@/app/types";
type PartText = { type: 'text'; value: string };
type PartDropdown = { type: 'dropdown'; options: string[]; correctIndex: number | null };
type Part = PartText | PartDropdown;
type QuizFormProps = {
  type: QuestionType;
  onSubmit: (data: QuestionData) => void;
};

const Dropdown = ({ type, onSubmit }: QuizFormProps) => {
  const [error, setError] = useState<string | null>(null)
  const [parts, setParts] = useState<Part[]>([]);
  const [rationale, setRationale] = useState('');
  const [lab, setLab] = useState('');

  // Add blank text block
  const addText = () => setParts((p) => [...p, { type: 'text', value: '' }]);

  // Add dropdown block with two empty options
  const addDropdown = () =>
    setParts((p) => [
      ...p,
      { type: 'dropdown', options: ['', ''], correctIndex: null } as PartDropdown,
    ]);

  const updateText = (index: number, value: string) => {
    setParts((prev) => {
      const next = [...prev];
      (next[index] as PartText).value = value;
      return next;
    });
  };

  // Update full options string (CSV) - not used in this version but kept for flexibility
  const updateDropdownOptions = (index: number, options: string[]) => {
    setParts((prev) => {
      const next = [...prev];
      (next[index] as PartDropdown).options = options;
      // ensure correctIndex still valid
      const ci = (next[index] as PartDropdown).correctIndex;
      if (ci !== null && ci >= options.length) (next[index] as PartDropdown).correctIndex = null;
      return next;
    });
  };

  const updateOptionText = (partIndex: number, optIndex: number, value: string) => {
    setParts((prev) => {
      const next = [...prev];
      const part = next[partIndex] as PartDropdown;
      part.options = [...part.options];
      part.options[optIndex] = value;
      return next;
    });
  };

  const addOptionToDropdown = (partIndex: number) => {
    setParts((prev) => {
      const next = [...prev];
      const part = next[partIndex] as PartDropdown;
      part.options = [...part.options, ''];
      return next;
    });
  };

  const removeOptionFromDropdown = (partIndex: number, optIndex: number) => {
    setParts((prev) => {
      const next = [...prev];
      const part = next[partIndex] as PartDropdown;
      part.options = part.options.filter((_, i) => i !== optIndex);
      // adjust correctIndex
      if (part.correctIndex !== null) {
        if (part.correctIndex === optIndex) part.correctIndex = null;
        else if (part.correctIndex! > optIndex) part.correctIndex!--;
      }
      return next;
    });
  };

  const setCorrectOption = (partIndex: number, optIndex: number) => {
    setParts((prev) => {
      const next = [...prev];
      const part = next[partIndex] as PartDropdown;
      part.correctIndex = optIndex;
      return next;
    });
  };

  const removePart = (index: number) => {
    setParts((prev) => prev.filter((_, i) => i !== index));
  };

  // Build the storage template: {{blank:correct:opt1,opt2}}
  const buildTemplate = () => {
    let formatted = '';
    const answers: string[] = [];

    parts.forEach((p,idx) => {
      if (p.type === 'text') {
        formatted += p.value;
      } else {
        const correct =
          p.correctIndex !== null && p.correctIndex >= 0 && p.correctIndex < p.options.length
            ? p.options[p.correctIndex]
            : p.options[0] ?? '';
        answers.push(correct);
        const opts = p.options.map((o) => o.trim()).join(',');
        formatted += ` {{blank:${idx}:${opts}}} `;
      }
    });

    return { formatted: formatted.trim(), answers };
  };

  const validateBeforeSave = () => {
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p.type === 'dropdown') {
        // ensure at least two non-empty options
        const nonEmpty = p.options.filter((o) => o.trim().length > 0);
        if (nonEmpty.length < 2) {
          return `Dropdown #${i + 1} must have at least 2 non-empty options.`;
        }
        // ensure a correct option is chosen
        if (p.correctIndex === null || p.correctIndex < 0 || p.correctIndex >= p.options.length) {
          return `Please select a correct option for dropdown #${i + 1}.`;
        }
      } else {
        // text should not be empty (optional - remove if empty texts allowed)
        if (p.value.trim() === '') {
          return `Text block #${i + 1} is empty. Fill it or remove it.`;
        }
      }
    }

    if (parts.length === 0) return 'Add at least one text or dropdown part.';
    return null;
  };

  const handleSave = () => {
    const error = validateBeforeSave();
    if (error) {
      setError(error)  
      return
    }
    const { formatted, answers } = buildTemplate();

    const data: QuestionData = {
      ques: formatted,
      opt: null,
      ans: answers,
      rationale,
      format: 'Dropdown',
      lab,
    };

    if (
      !data.ques ||
      !data.ans ||
      !data.rationale ||
      !data.format 
    ) {
      const missingFields = [];
      if (!data.ques) missingFields.push("Question text");
      if (!data.ans) missingFields.push("Answer");
      if (!data.rationale) missingFields.push("Rationale");
    
      const errorMsg = `Please fill in all required fields: ${missingFields.join(", ")}.`;
      setError(errorMsg)  
      return
    }
    
    onSubmit(data);

  };

  return (
    <div className="m-6 p-6 border rounded-xl shadow-md max-w-3xl">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <List /> Build Dropdown Sentence
      </h2>

      {/* Builder canvas */}
      <div className="space-y-3 mb-4">
        {parts.map((part, i) => (
          <div key={i} className="p-3 border rounded flex flex-col gap-3 bg-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <strong className="text-sm">Part {i + 1}:</strong>
                <span className="text-xs text-gray-500">
                  {part.type === 'text' ? 'Text' : 'Dropdown'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removePart(i)}
                className="flex items-center gap-1 text-sm text-red-600 hover:underline"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>

            {part.type === 'text' ? (
              <input
                type="text"
                value={part.value}
                onChange={(e) => updateText(i, e.target.value)}
                placeholder="Enter literal text..."
                className="w-full border rounded p-2"
              />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Options:</span>
                  <button
                    type="button"
                    onClick={() => addOptionToDropdown(i)}
                    className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    <PlusCircle size={14} /> Add option
                  </button>
                </div>

                <div className="space-y-2">
                  {(part.options as string[]).map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${i}`}
                        checked={part.correctIndex === oi}
                        onChange={() => setCorrectOption(i, oi)}
                        className="h-4 w-4"
                        title="Mark as correct"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOptionText(i, oi, e.target.value)}
                        placeholder={`Option ${oi + 1}`}
                        className="flex-1 border rounded p-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeOptionFromDropdown(i, oi)}
                        className="text-sm text-red-600 px-2 py-1 rounded hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-gray-500">
                  Mark one option (radio) as the correct answer. You must have at least 2 non-empty
                  options.
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={addText}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          <Type size={16} /> Add Text
        </button>
        <button
          type="button"
          onClick={addDropdown}
          className="flex items-center gap-2 bg-yellow-200 px-4 py-2 rounded hover:bg-yellow-300"
        >
          <List size={16} /> Add Dropdown
        </button>
      </div>

      {/* Extra fields */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Rationale:</label>
        <textarea
          rows={3}
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Lab:</label>
        <input
          type="text"
          value={lab}
          onChange={(e) => setLab(e.target.value)}
          placeholder="e.g. "
          className="w-full border rounded p-2"
        />
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          <Save size={18} /> Save Question
        </button>
        <ErrorModal
          open={!!error}
          onClose={() => setError(null)}
          message={error || ""}
        />
        <div className="text-sm text-gray-600">Tip: select the correct option with the radio.</div>
      </div>

      {/* Live preview */}
      {parts.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Live Preview:</h3>
          <p className="leading-relaxed flex flex-wrap gap-2 items-center">
            {parts.map((p, idx) =>
              p.type === 'text' ? (
                <span key={idx}>{p.value}</span>
              ) : (
                <select key={idx} className="border rounded p-1">
                  {p.options.map((o, oi) => (
                    <option key={oi}>{o || `Option ${oi + 1}`}</option>
                  ))}
                </select>
              )
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
