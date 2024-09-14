import { ReadingContentType } from './content/reading-content-type';
import { ListeningContentType } from './content/listening-content-type';

import { MultipleChoiceQuestionType } from './question/multiple-choice-question-type';
import { FillInTheBlankQuestionType } from './question/fill-in-the-blank-question-type';
import { MatchingPairsQuestionType } from './question/matching-pairs-question-type';
import { SpeakingQuestionType } from './question/speaking-question-type';
import { WritingQuestionType } from './question/writing-question-type';

export type ContentType = ReadingContentType | ListeningContentType;

export type QuestionType =
  | MultipleChoiceQuestionType
  | FillInTheBlankQuestionType
  | MatchingPairsQuestionType
  | SpeakingQuestionType
  | WritingQuestionType;

export type BaseCardType = {
  cardId: string;
  title: string;
  content: ContentType;
  question: QuestionType;
  progress?: number;
  difficulty: string;
  topic: string[];
  createdAt: string;
};
