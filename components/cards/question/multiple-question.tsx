import React, { useState } from 'react';
import { Button } from "../../ui/button";
import { MultipleChoiceQuestionType } from '../../../types/card/question/multiple-choice-question-type';

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionType> = ({ options, correctAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
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
