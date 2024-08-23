// FillInTheBlankCard.tsx
import React, { useState, useEffect } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FillInTheBlankCardProps {
  title: string;
  description: string;
  options: string[];
  progress: number;
}

const FillInTheBlankCard: React.FC<FillInTheBlankCardProps> = ({ title, description, options, progress }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setShuffledOptions(shuffleArray([...options]));
  }, [options]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(prevOption => (prevOption === option ? null : option));
  };

  const isOptionSelected = selectedOption !== null;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={progress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="space-y-4 w-full">
          {shuffledOptions.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? 'primary' : 'outline'}
              className="w-full"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex">        
        <Button disabled={!isOptionSelected} className='w-full'>Continue</Button>
      </div>
    </div>
  );
};

export default FillInTheBlankCard;
