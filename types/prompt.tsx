export interface Prompt {
  id: number;
  created_at: string;
  text: string;
  user_id: string;
}

export type Thread = { prompt: Prompt; thread: Prompts[] };

export interface Prompts {
  id: number;
  created_at: string;
  user_id: string;
  prompt_id: number;
  question: Question;
}

export interface Question {
  id: number;
  question_text: string;
  options: Option[];
}

export interface Option {
  option_text: string;
  id: number;
  question_id: number;
  is_correct_answer: boolean;
  is_selected: boolean;
  is_typed: boolean;
}
