import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { PlayIcon, PauseIcon } from 'lucide-react';

interface ListeningCardProps {
  title: string;
  description: string;
  options: string[];
  audioUrl: string;
  progress: number;
}

const ListeningCard: React.FC<ListeningCardProps> = ({ title, description, options, audioUrl, progress }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(progress);
  const { toast } = useToast();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    // You could add logic here to actually control audio playback if needed
  };

  const handleContinueClick = () => {
    toast({
      title: "Correct!",
      description: "You got it right!",
    });

    setCurrentProgress((prev) => Math.min(prev + 10, 100));
  };

  const isOptionSelected = selectedOption !== null;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <Button
          variant={isPlaying ? "default" : "outline"}
          className="w-24 h-24 rounded-full flex items-center justify-center"
          onClick={handlePlayClick}
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5 animate-pulse" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </Button>
        <div className="w-full space-y-2">
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
      <div className="mt-4 flex">
        <Button variant="default" disabled={!isOptionSelected} className='w-full' onClick={handleContinueClick}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ListeningCard;
