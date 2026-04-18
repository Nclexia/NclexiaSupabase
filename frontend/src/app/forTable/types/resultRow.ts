export type ResultRow = {
    // user_id,
    id: number;
    question_id: number;
    time_taken_secs: number;
    selected_option: string;
    correct_option: string;
    practice_session_id: number;
    is_correct: boolean;
    attempted_at: number;
    subject: string;
    system: string;
    total: number;
    obtain: number;
  
  
  };