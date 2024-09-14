import React, { useState } from 'react';
import { Progress } from "../ui/progress";
import { CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";  // Import Button
import { BaseCardType } from '../../types/card/base-card-type';

import ReadingContent from './content/reading-content';
import ListeningContent from './content/listening-content';

import MultipleChoiceQuestion from './question/multiple-question';
import FillInTheBlankQuestion from './question/fill-in-the-blank-question';
import MatchingPairsQuestion from './question/matching-question';
import SpeakingQuestion from './question/speaking-question';
import WritingQuestion from './question/write-question';

const BaseCard: React.FC<BaseCardType> = ({ title, content, question, progress }) => {
  const [showFeedback, setShowFeedback] = useState(false);  // Track if feedback should be shown
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);  // Track correctness of the answer
  const [currentProgress, setCurrentProgress] = useState(progress ?? 0);  // Track progress

  const checkAnswer = () => {
    // Simple placeholder logic for correctness (you should replace with your actual validation logic)
    if (question.correctAnswer === 'Paris' || question.correctAnswer === '8') {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowFeedback(true);  // Show feedback after checking
    setCurrentProgress((prevProgress) => Math.min(prevProgress + 10, 100));  // Increase progress
  };

  const handleContinue = () => {
    setShowFeedback(false);  // Hide feedback and show next card
    // Logic to fetch/display the next content and question (you can implement based on your needs)
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

  const renderFeedback = () => {
    return isCorrect ? (
      <div className="text-green-600 font-bold">Congratulations! Your answer is correct.</div>
    ) : (
      <div className="text-red-600 font-bold">Oops! That's not the correct answer.</div>
    );
  };

  return (
    <div className="flex flex-col justify-between h-full">
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
    </div>
  );
};

export default BaseCard;
