export type MatchingPairsQuestionType = {
    type: 'matching-pairs';
    question: string;
    pairs: { left: string; right: string }[];
  };
  