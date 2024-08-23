import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReadingCardProps {
  title: string;
  description: string;
  passage: string;
  questions: { question: string; options: string[] }[];
}

const ReadingCard: React.FC<ReadingCardProps> = ({ title, description, passage, questions }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <p className="mt-4">{passage}</p>
      <div className="mt-4">
        {questions.map((questionItem, index) => (
          <div key={index}>
            <p>{questionItem.question}</p>
            {questionItem.options.map((option, i) => (
              <Button key={i} variant="outline" className="w-full mb-2">
                {option}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ReadingCard;
