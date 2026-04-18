
export type Questions = {
  question_id: string;
  ques: string;
  opt: string;
  rationale: string;
  ans: string;
  format: string;
  scenario_id: string;
  scenario: string;
  subject: string;
  system: string;
  type: string;
  score?: number;
}

export type QuestionType = 'Single' | 'Multiple' | 'Highlight' | 'Drag' | 'Dropdown' | 'Multi Rating' | '';

export type QuestionData = {
  ques: string;
  opt?: string | null|any;
  ans: any[];
  rationale: string;
  format: string;
  lab?: string;
};

export type QuestionBlock = {
  id: string;
  type: QuestionType | '';
  showForm: boolean;
  data?: QuestionData;
};
export type AnswerValue = string | string[] | { text: string | string[] };

export type QuizRenderQuestions = {
  question_id: string;
  ques: string;
  opt: string;
  rationale: string;
  ans: string;
  format: string;
  scenario: string;
  subject: string;
  system: string;
  type: string;

}
export type DetailAnswer = {
  correct_option: string;
  selected_option: string;
  question_id: string;
  ques: string;
  opt: string;
  rationale: string;
  format: string;
  scenario: string;
  scenario_id: number;
  used_question_id: number;
  time_taken_secs: string;

}
export type ScenarioData = {
  id: Number;
  scenario: string;
  score: Number;
  subject: string;
  system: string;
  type: string;
}