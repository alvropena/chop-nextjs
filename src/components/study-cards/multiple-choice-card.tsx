import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";

interface MultipleChoiceCardProps {
  title: string;
  description: string;
  options: string[];
  imageUrl?: string;
  progress?: number;
  onContinue: () => void; // Agrega esta línea
}
const MultipleChoiceCard: React.FC<MultipleChoiceCardProps> = ({
  title,
  description,
  options,
  imageUrl,
  progress,
  onContinue,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentProgress, setCurrentProgress] = useState(progress);
  const { toast } = useToast();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinueClick = () => {
    toast({
      title: "Correct!",
      description: "You got it right!",
    });

    setCurrentProgress((prev) => Math.min(prev ?? 0 + 10, 100));

    // Llama a onContinue en lugar de manejar la lógica aquí
    onContinue();
  };

  const isOptionSelected = selectedOption !== null;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {imageUrl && (
        <div
          className="mb-4 flex justify-center items-center w-full relative overflow-hidden rounded"
          style={{ height: "200px" }}
        >
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      )}
      <div
        className={`flex flex-col items-center justify-center space-y-4 w-full ${imageUrl ? "flex-grow" : ""}`}
      >
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
      <div className="mt-4 flex justify-between gap-4">
        <Button
          variant="default"
          disabled={!isOptionSelected}
          className="w-full"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MultipleChoiceCard;
