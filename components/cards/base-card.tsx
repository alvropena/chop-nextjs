import React from 'react';
import { Progress } from "../ui/progress";
import { CardTitle, CardDescription } from "../ui/card";
import { BaseCardType } from '../../types/base-card-type';

import ReadingContent from './content/reading-content';
import ListeningContent from './content/listening-content';

import MultipleChoiceQuestion from './question/multiple-question';
import FillInTheBlankQuestion from './question/fill-in-the-blank-question';
import MatchingPairsQuestion from './question/matching-question';
import SpeakingQuestion from './question/speaking-question';
import WritingQuestion from './question/write-question';


const BaseCard: React.FC<BaseCardType> = ({ title, content, question, progress }) => {
  const renderContent = () => {
    if (!content) return null;

    switch (content.type) {
      case 'reading':
        return <ReadingContent {...content} />;
      case 'listening':
        return <ListeningContent {...content} />;
      default:
        return null;
    }
  };

  const renderQuestion = () => {
    if (!question) return null;

    switch (question.type) {
      case 'multiple-choice':
        return <MultipleChoiceQuestion {...question} />;
      case 'fill-in-the-blank':
        return <FillInTheBlankQuestion {...question} />;
      case 'matching-pairs':
        return <MatchingPairsQuestion {...question} />;
      case 'speaking':
        return <SpeakingQuestion {...question} />;
      case 'writing':
        return <WritingQuestion {...question} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={progress ?? 0} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>Complete the task below:</CardDescription>
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
      <div className="mt-4 flex-grow">
        {renderQuestion()}
      </div>
    </div>
  );
};

export default BaseCard;
