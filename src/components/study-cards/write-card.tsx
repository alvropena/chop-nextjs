import React, { useState } from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";

interface WriteCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  progress: number;
}

const WriteCard: React.FC<WriteCardProps> = ({ title, description, imageUrl, progress }) => {
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

    setCurrentProgress((prev) => Math.min(prev + 10, 100));
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {imageUrl && (
        <div className="mb-4 flex justify-center">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={300}
            className="rounded"
            layout="responsive"
            objectFit="cover"
          />
        </div>
      )}
      <div className="flex-grow flex flex-col items-center justify-center space-y-4 w-full">
        <textarea
          className="p-2 w-full h-32 border rounded"
          placeholder="Type your answer here..."
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="default" disabled={!text} className="w-full" onClick={handleContinueClick}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default WriteCard;
