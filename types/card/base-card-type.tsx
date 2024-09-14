import { ReadingContentType } from './card/content/reading-content-type';
import { ListeningContentType } from './card/content/listening-content-type';

import { MultipleChoiceQuestionType } from './card/question/multiple-choice-question-type';
import { FillInTheBlankQuestionType } from './card/question/fill-in-the-blank-question-type';
import { MatchingPairsQuestionType } from './card/question/matching-pairs-question-type';
import { SpeakingQuestionType } from './card/question/speaking-question-type';
import { WritingQuestionType } from './card/question/writing-question-type';

export type ContentType = ReadingContentType | ListeningContentType;

export type QuestionType =
  | MultipleChoiceQuestionType
  | FillInTheBlankQuestionType
  | MatchingPairsQuestionType
  | SpeakingQuestionType
  | WritingQuestionType;

export type BaseCardType = {
  title: string;
  content: ContentType;
  question: QuestionType;
  progress?: number;
};
