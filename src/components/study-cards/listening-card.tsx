import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ListeningCardProps {
  title: string;
  description: string;
  options: string[];
  audioUrl: string;
}

const ListeningCard: React.FC<ListeningCardProps> = ({ title, description, options, audioUrl }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-4">
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        {options.map((option, index) => (
          <Button key={index} variant="outline" className="w-full mb-2">
            {option}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ListeningCard;
