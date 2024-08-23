import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FillInTheBlankCardProps {
  title: string;
  description: string;
  options: string[];
}

const FillInTheBlankCard: React.FC<FillInTheBlankCardProps> = ({ title, description, options }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-4">
        {options.map((option, index) => (
          <Button key={index} variant="outline" className="w-full mb-2">
            {option}
          </Button>
        ))}
      </div>
    </>
  );
};

export default FillInTheBlankCard;
