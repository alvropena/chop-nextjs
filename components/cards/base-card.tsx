import React, { useState } from 'react';
import { Progress } from "../ui/progress";
import { CardTitle, CardDescription, Card } from "../ui/card";
import { Button } from "../ui/button";
import { BaseCardType } from '../../types/card/base-card-type';

import ReadingContent from './content/reading-content';
import ListeningContent from './content/listening-content';

import MultipleChoiceQuestion from './question/multiple-question';
import FillInTheBlankQuestion from './question/fill-in-the-blank-question';
import MatchingPairsQuestion from './question/matching-question';
import SpeakingQuestion from './question/speaking-question';
import WritingQuestion from './question/write-question';

const BaseCard: React.FC<BaseCardType> = ({ title, content, question, progress }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentProgress, setCurrentProgress] = useState(progress ?? 0);

  const checkAnswer = () => {
    if (question.correctAnswer === 'Paris' || question.correctAnswer === '8') {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowFeedback(true);
    setCurrentProgress((prevProgress) => Math.min(prevProgress + 10, 100));
  };

  const handleContinue = () => {
    setShowFeedback(false);
  };

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
        return <MultipleChoiceQuestion />;
      case 'fill-in-the-blank':
        return <FillInTheBlankQuestion />;
      case 'matching-pairs':
        return <MatchingPairsQuestion />;
      case 'speaking':
        return <SpeakingQuestion />;
      case 'writing':
        return <WritingQuestion />;
      default:
        return null;
    }
  };

  const renderFeedback = () => {
    return isCorrect ? (
      <div className="text-green-600 font-bold">Congratulations! Your answer is correct.</div>
    ) : (
      <div className="text-red-600 font-bold">Oops! That's not the correct answer.</div>
    );
  };

  return (
    <Card className="flex flex-col justify-between h-full w-2/5 p-6">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{renderContent()}</CardDescription>
      </div>
      <div className="mt-4">
        {!showFeedback ? (
          <>
            <div className="mt-4">
              {renderQuestion()}
            </div>
            <Button onClick={checkAnswer} className="mt-4 w-full">
              Check
            </Button>
          </>
        ) : (
          <>
            {renderFeedback()}
            <Button onClick={handleContinue} className="mt-4 w-full">
              Continue
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default BaseCard;
