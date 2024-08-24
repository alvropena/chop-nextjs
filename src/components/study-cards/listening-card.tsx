import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MicIcon, AudioLines } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface ListeningCardProps {
  title: string;
  description: string;
  options: string[];
  audioUrl: string;
  progress?: number;
  onContinue: () => void; // Agrega esta línea
}

const ListeningCard: React.FC<ListeningCardProps> = ({
  title,
  description,
  options,
  audioUrl,
  progress,
  onContinue,
}) => {
  const [currentProgress, setCurrentProgress] = useState(progress);
  const { toast } = useToast();

  const handleContinueClick = () => {
    toast({
      title: "Great job!",
      description: "You completed this task.",
    });

    setCurrentProgress((prev) => Math.min(prev ?? 0 + 10, 100));
    onContinue(); // Llama a onContinue en lugar de manejar la lógica aquí
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <audio controls src={audioUrl} className="w-full mt-4">
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="mt-4 flex">
        <Button onClick={handleContinueClick} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ListeningCard;
