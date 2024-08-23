// ListeningCard.tsx
import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ListeningCardProps {
  title: string;
  description: string;
  options: string[];
  audioUrl: string;
  progress: number;
}

const ListeningCard: React.FC<ListeningCardProps> = ({ title, description, options, audioUrl, progress }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const isOptionSelected = selectedOption !== null;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={progress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <audio controls className="w-full">
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <div className="w-full space-y-2">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? "primary" : "outline"}
              className="w-full"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex">
        <Button variant="default" disabled={!isOptionSelected} className='w-full'>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ListeningCard;
