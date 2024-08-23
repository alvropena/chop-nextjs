// ReadingCard.tsx
import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ReadingCardProps {
  title: string;
  description: string;
  passage: string;
  questions: { question: string; options: string[] }[];
  progress: number;
}

const ReadingCard: React.FC<ReadingCardProps> = ({ title, description, passage, questions, progress }) => {
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>(Array(questions.length).fill(null));

  const handleOptionClick = (questionIndex: number, option: string) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[questionIndex] = option;
    setSelectedOptions(updatedSelections);
  };

  const allQuestionsAnswered = selectedOptions.every(option => option !== null);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={progress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="mt-4">
        <p className="p-4 bg-gray-100 rounded">{passage}</p>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 w-full mt-4">
        {questions.map((questionItem, index) => (
          <div key={index} className="w-full">
            <p className="font-medium mb-2">{questionItem.question}</p>
            {questionItem.options.map((option, i) => (
              <Button
                key={i}
                variant={selectedOptions[index] === option ? "primary" : "outline"}
                className="w-full mb-2"
                onClick={() => handleOptionClick(index, option)}
              >
                {option}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <Button variant="default" disabled={!allQuestionsAnswered} className='w-full'>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ReadingCard;
