import React, { useState } from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";

interface WriteCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  progress?: number;
  onContinue: () => void; // Agrega esta línea
}
const WriteCard: React.FC<WriteCardProps> = ({
  title,
  description,
  imageUrl,
  progress,
  onContinue,
}) => {
  const [text, setText] = useState<string>("");
  const [currentProgress, setCurrentProgress] = useState(progress);
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
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

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {imageUrl && (
        <div className="mb-4 flex justify-center items-center flex-grow w-full relative overflow-hidden rounded">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-4">
        <div className="flex-grow flex flex-col items-center justify-center space-y-2 w-full">
          <Textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type your answer here..."
            className="min-h-[80px]" // Adjusted for visual balance
          />
        </div>
        <Button
          variant="default"
          disabled={!text}
          className="w-full"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default WriteCard;
