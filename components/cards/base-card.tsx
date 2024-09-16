import React, { useState } from "react";
import { Progress } from "../ui/progress";
import { CardTitle, CardDescription, Card } from "../ui/card";
import { Button } from "../ui/button";
import { BaseCardType } from "../../types/card/base-card-type";
import MultipleChoiceQuestion from "./question/multiple-question";
import FillInTheBlankQuestion from "./question/fill-in-the-blank-question";
import MatchingPairsQuestion from "./question/matching-pairs-question";
import SpeakingQuestion from "./question/speaking-question";
import WritingQuestion from "./question/write-question";
import CardContent from "./content/card-content";

const BaseCard: React.FC<BaseCardType> = ({ title, content, question, progress }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentProgress, setCurrentProgress] = useState(progress ?? 0);

  const checkAnswer = () => {
    if (question.type === "multiple-choice" || question.type === "fill-in-the-blank") {
      if (question.correctAnswer === "Paris" || question.correctAnswer === "8") {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    } else if (question.type === "matching-pairs") {
      setIsCorrect(true);  // Example placeholder logic
    } else if (question.type === "speaking") {
      setIsCorrect(true);  // Example placeholder logic
    } else if (question.type === "writing") {
      setIsCorrect(true);  // Example placeholder logic
    }

    setShowFeedback(true);
    setCurrentProgress((prevProgress) => Math.min(prevProgress + 10, 100));
  };

  const handleContinue = () => {
    setShowFeedback(false);
  };

  const renderQuestion = () => {
    if (!question) return null;

    switch (question.type) {
      case "multiple-choice":
        return <MultipleChoiceQuestion {...question} />;
      case "fill-in-the-blank":
        return <FillInTheBlankQuestion {...question} />;
      case "matching-pairs":
        return <MatchingPairsQuestion {...question} />;
      case "speaking":
        return <SpeakingQuestion {...question} />;
      case "writing":
        return <WritingQuestion {...question} />;
      default:
        return null;
    }
  };

  const renderFeedback = () => {
    return isCorrect ? (
      <div className="text-green-600 font-bold">Congratulations! Your answer is correct.</div>
    ) : (
      <div className="text-red-600 font-bold">Oops! That&apos;s not the correct answer.</div>
    );
  };

  return (
    <Card className="flex flex-col justify-between h-full w-full md:w-2/6 p-6">
      <Progress value={currentProgress} className="w-full mb-4 h-3" />
      <div className="mt-4">
        {!showFeedback ? (
          <>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                <CardContent
                  passage={content.passage}   // Always show passage
                  audioUrl={content.audioUrl} // Conditionally show audio
                  imageUrl={content.imageUrl} // Conditionally show image
                />
              </CardDescription>
            </div>
            <div className="mt-4">{renderQuestion()}</div>
            <div>
              <Button onClick={checkAnswer} className="mt-4 w-full">
                Check
              </Button>
            </div>
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
