// Content Types (either reading or listening, both can optionally have images)
interface ReadingContent {
  type: 'reading';
  passage: string;
  imageUrl?: string;  // Optional image for reading content
}

interface ListeningContent {
  type: 'listening';
  audioUrl: string;
  imageUrl?: string;  // Optional image for listening content
}

type ContentType = ReadingContent | ListeningContent;

// Question Types (fill-in-the-blank, matching-pairs, etc.)
interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswer: string;
}

interface FillInTheBlankQuestion {
  type: 'fill-in-the-blank';
  question: string;
  correctAnswer: string;
}

interface MatchingPairsQuestion {
  type: 'matching-pairs';
  question: string;
  pairs: { left: string; right: string }[];
}

interface WritingQuestion {
  type: 'writing';
  question: string;
  textInputPlaceholder?: string;  // Optional placeholder for writing input
}

interface SpeakingQuestion {
  type: 'speaking';
  question: string;
}

type QuestionType = MultipleChoiceQuestion | FillInTheBlankQuestion | MatchingPairsQuestion | WritingQuestion | SpeakingQuestion;

// Final Card Type that combines content and question
export interface CardType {
  cardId: string;
  title: string;
  content: ContentType;
  question: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  createdAt: string;
}
