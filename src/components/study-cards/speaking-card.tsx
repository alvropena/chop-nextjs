import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SpeakingCardProps {
  title: string;
  description: string;
}

const SpeakingCard: React.FC<SpeakingCardProps> = ({ title, description }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-4">
        <Button variant="outline" className="w-full">
          Press to Record
        </Button>
      </div>
    </>
  );
};

export default SpeakingCard;
