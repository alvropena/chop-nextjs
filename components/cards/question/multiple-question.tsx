import React, { useState } from "react";
import { Button } from "../../ui/button";
import type { MultipleChoiceQuestionType } from "@/types/card/question/multiple-choice-question-type";
import { useCardStore } from "@/stores/use-card-store";

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionType> = ({
  options,
  correctAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const setIsCorrect = useCardStore((state) => state.setIsCorrect);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === correctAnswer);
  };

  return (
    <div>
      <div className="space-y-4">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === option ? "default" : "outline"}
            className="w-full"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
