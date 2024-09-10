import React, { useState, useEffect } from 'react';
import { CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useToast } from "../ui/use-toast";

interface MatchingPairsCardProps {
  title: string;
  description: string;
  pairs: { left: string; right: string }[];
  progress?: number;
  onContinue: () => void; // Agrega esta línea
}

const MatchingPairsCard: React.FC<MatchingPairsCardProps> = ({
  title,
  description,
  pairs,
  progress,
}) => {
  const [selectedPairs, setSelectedPairs] = useState<
    { left: string | null; right: string | null }[]
  >([]);
  const [matchedPairs, setMatchedPairs] = useState<
    { left: string; right: string }[]
  >([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [shuffledLeft, setShuffledLeft] = useState<string[]>([]);
  const [shuffledRight, setShuffledRight] = useState<string[]>([]);
  const [currentProgress, setCurrentProgress] = useState(progress);
  const { toast } = useToast();

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const leftItems = pairs.map((pair) => pair.left);
    const rightItems = pairs.map((pair) => pair.right);
    setShuffledLeft(shuffleArray(leftItems));
    setShuffledRight(shuffleArray(rightItems));
  }, [pairs]);

  const handleLeftClick = (left: string) => {
    setSelectedLeft(left);
    if (selectedRight) {
      checkMatch(left, selectedRight);
    }
  };

  const handleRightClick = (right: string) => {
    setSelectedRight(right);
    if (selectedLeft) {
      checkMatch(selectedLeft, right);
    }
  };

  const checkMatch = (left: string, right: string) => {
    const correctPair = pairs.find(
      (pair) => pair.left === left && pair.right === right
    );
    if (correctPair) {
      setMatchedPairs([...matchedPairs, { left, right }]);
      setSelectedPairs([...selectedPairs, { left, right }]);

      toast({
        title: "Correct!",
        description: "You got it right!",
      });

      setCurrentProgress((prev) => Math.min(prev ?? 0 + 10, 100));
    } else {
      toast({
        title: "Wrong!",
        description: "Try again.",
      });
    }
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const allPairsMatched = matchedPairs.length === pairs.length;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Progress value={currentProgress} className="w-full mb-4 h-3" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {shuffledLeft.map((left, index) => (
              <Button
                key={index}
                variant={
                  matchedPairs.some((pair) => pair.left === left)
                    ? "default"
                    : "outline"
                }
                className="w-full"
                onClick={() => handleLeftClick(left)}
                disabled={matchedPairs.some((pair) => pair.left === left)}
              >
                {left}
              </Button>
            ))}
          </div>
          <div className="space-y-4">
            {shuffledRight.map((right, index) => (
              <Button
                key={index}
                variant={
                  matchedPairs.some((pair) => pair.right === right)
                    ? "default"
                    : "outline"
                }
                className="w-full"
                onClick={() => handleRightClick(right)}
                disabled={matchedPairs.some((pair) => pair.right === right)}
              >
                {right}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex">
        <Button disabled={!allPairsMatched} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MatchingPairsCard;
