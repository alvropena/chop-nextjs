import React, { useState } from "react";
import Image from "next/image";
import { Progress } from "../ui/progress";
import { CardTitle, CardDescription, Card } from "../ui/card";
import { Button } from "../ui/button";
import type { BaseCardType, QuestionType } from "@/types/card/base-card-type";
import MultipleChoiceQuestion from "./question/multiple-question";
import FillInTheBlankQuestion from "./question/fill-in-the-blank-question";
import MatchingPairsQuestion from "./question/matching-pairs-question";
import SpeakingQuestion from "./question/speaking-question";
import WritingQuestion from "./question/write-question";
import CardContent from "./content/card-content";
import { useCardStore } from "@/stores/use-card-store"; // a
import { CircleX } from "lucide-react";

const FeedBack = () => {
  const isCorrect = useCardStore((state) => state.isCorrect);
  return isCorrect ? (
    <div className="text-center">
      <div className="text-green-600 font-bold text-3xl">Congratulations!</div>
      <div className="relative">
        <Image
          src="/images/celebrate.svg"
          alt="Congrats!"
          width={240}
          height={280}
          className="mx-auto"
        />
      </div>
      <div className="text-green-600 font-bold text-xl">
        Your answer is correct.
      </div>
    </div>
  ) : (
    <div className="text-center py-4">
      <CircleX className="text-red-600 mx-auto mb-7" size={100} />
      <div className="text-red-600 font-bold text-lg">
        Oops! That&apos;s not the correct answer.
      </div>
    </div>
  );
};

const Question = ({ question }: { question: QuestionType }) => {
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

const BaseCard: React.FC<BaseCardType> = ({
  title,
  content,
  question,
  progress,
}) => {
  const [currentProgress, setCurrentProgress] = useState(progress ?? 0);
  const showFeedback = useCardStore((state) => state.showFeedback);
  const setIsCorrect = useCardStore((state) => state.setIsCorrect);
  const setShowFeedback = useCardStore((state) => state.setShowFeedback);

  const checkAnswer = () => {
    if (
      question.type === "multiple-choice" ||
      question.type === "fill-in-the-blank"
    ) {
      // if (
      //   question.correctAnswer === "Paris" ||
      //   question.correctAnswer === "8"
      // ) {
      //   setIsCorrect(true);
      // } else {
      //   setIsCorrect(false);
      // }
    } else if (question.type === "matching-pairs") {
      setIsCorrect(true); // Example placeholder logic
    } else if (question.type === "speaking") {
      setIsCorrect(true); // Example placeholder logic
    } else if (question.type === "writing") {
      setIsCorrect(true); // Example placeholder logic
    }

    setShowFeedback(true);
    setCurrentProgress((prevProgress) => Math.min(prevProgress + 10, 100));
  };

  const handleContinue = () => {
    setShowFeedback(false);
  };

  return (
    <Card className="flex flex-col justify-start h-fit w-full md:w-2/6 p-6">
      <Progress value={currentProgress} className="w-full mb-4 h-3" />
      <div className="mt-4">
        {!showFeedback ? (
          <>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                <CardContent
                  passage={content.passage} // Always show passage
                  audioUrl={content.audioUrl} // Conditionally show audio
                  imageUrl={content.imageUrl} // Conditionally show image
                />
              </CardDescription>
            </div>
            <div className="mt-4">
              <Question question={question} />
            </div>
            <div>
              <Button onClick={checkAnswer} className="mt-4 w-full">
                Check
              </Button>
            </div>
          </>
        ) : (
          <>
            <FeedBack />
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
