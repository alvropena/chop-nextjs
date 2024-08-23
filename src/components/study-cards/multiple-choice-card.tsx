import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

interface MultipleChoiceCardProps {
  title: string;
  description: string;
  options: string[];
  imageUrl?: string;
}

const MultipleChoiceCard: React.FC<MultipleChoiceCardProps> = ({ title, description, options, imageUrl }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {imageUrl && (
        <div className="mb-4">
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

export default MultipleChoiceCard;
