import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";

interface MatchingPairsCardProps {
  title: string;
  description: string;
  pairs: { left: string; right: string }[];
}

const MatchingPairsCard: React.FC<MatchingPairsCardProps> = ({ title, description, pairs }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {pairs.map((pair, index) => (
          <div key={index} className="flex justify-between">
            <span>{pair.left}</span>
            <span>{pair.right}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MatchingPairsCard;
