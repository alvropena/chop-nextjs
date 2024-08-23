import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MicIcon, AudioLines } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface SpeakingCardProps {
  title: string;
  description: string;
  onContinue: (outcome: string) => void;
  progress?: number;
}

const SpeakingCard: React.FC<SpeakingCardProps> = ({ title, description, onContinue, progress }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(progress);
  const { toast } = useToast();

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
  };

  const handleContinueClick = () => {
    const outcome = isRecording ? "correct" : "wrong";
    toast({
      title: outcome === "correct" ? "Correct!" : "Wrong!",
      description: outcome === "correct" ? "You got it right!" : "Try again.",
    });
    onContinue(outcome);

    // Increase progress for now, regardless of outcome
    setCurrentProgress((prev) => Math.min(prev ?? 0 + 10, 100)); // Increments by 10 or caps at 100
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <Button
          variant={isRecording ? "default" : "outline"}
          className="w-24 h-24 rounded-full flex items-center justify-center"
          onClick={handleRecordClick}
        >
          {isRecording ? (
            <AudioLines className="w-5 h-5 animate-pulse" />
          ) : (
            <MicIcon className="w-5 h-5" />
          )}
        </Button>
        {isRecording && (
          <Badge className="mt-4 animate-pulse" variant="secondary">
            Just talk.
          </Badge>
        )}
      </div>
      <div className="mt-4 flex">
        <Button onClick={handleContinueClick} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SpeakingCard;
