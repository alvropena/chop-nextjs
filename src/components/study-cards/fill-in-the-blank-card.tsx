import React, { useState, useEffect } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface FillInTheBlankCardProps {
  title: string;
  description: string;
  options: string[];
  progress?: number;
  onContinue: () => void; // Agrega esta línea
}

const FillInTheBlankCard: React.FC<FillInTheBlankCardProps> = ({
  title,
  description,
  options,
  progress,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [checked, setChecked] = useState(false);
  const { toast } = useToast();

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setShuffledOptions(shuffleArray([...options]));
  }, [options]);

  const handleOptionClick = (option: string) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

  const handleCheckClick = () => {
    toast({
      title: "Correct!",
      description: "You got it right!",
    });

    setCurrentProgress((prev) => Math.min(prev ?? 0 + 10, 100));
    setChecked(true);
  };

  const handleContinueClick = () => {
    // Handle the continue action
  };

  const isOptionSelected = selectedOption !== null;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="space-y-4 w-full">
          {shuffledOptions.map((option, index) => (
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
      <div className="mt-4 flex">
        {checked ? (
          <Button
            disabled={!isOptionSelected}
            className="w-full"
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        ) : (
          <Button
            disabled={!isOptionSelected}
            className="w-full"
            onClick={handleCheckClick}
          >
            Check
          </Button>
        )}
      </div>
    </div>
  );
};

export default FillInTheBlankCard;
