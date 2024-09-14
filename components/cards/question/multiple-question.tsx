import React, { useState } from 'react';
import { Button } from "../../ui/button";

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question, options, correctAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <p className="font-medium mb-2">{question}</p>
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
