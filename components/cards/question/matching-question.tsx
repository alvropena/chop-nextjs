import React, { useState } from 'react';
import { Button } from "../../ui/button";

interface MatchingPairsQuestionProps {
  question: string;
  pairs: { left: string; right: string }[];
}

const MatchingPairsQuestion: React.FC<MatchingPairsQuestionProps> = ({ question, pairs }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ left: string; right: string }[]>([]);
  
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
    const isMatch = pairs.some(pair => pair.left === left && pair.right === right);
    if (isMatch) {
      setMatchedPairs([...matchedPairs, { left, right }]);
    }
    // Reset selected values for the next match attempt
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const allPairsMatched = matchedPairs.length === pairs.length;

  return (
    <div>
      <p className="font-medium mb-2">{question}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {pairs.map(pair => (
            <Button
              key={pair.left}
              variant={matchedPairs.some(mp => mp.left === pair.left) ? 'default' : 'outline'}
              disabled={matchedPairs.some(mp => mp.left === pair.left)}
              onClick={() => handleLeftClick(pair.left)}
            >
              {pair.left}
            </Button>
          ))}
        </div>
        <div>
          {pairs.map(pair => (
            <Button
              key={pair.right}
              variant={matchedPairs.some(mp => mp.right === pair.right) ? 'default' : 'outline'}
              disabled={matchedPairs.some(mp => mp.right === pair.right)}
              onClick={() => handleRightClick(pair.right)}
            >
              {pair.right}
            </Button>
          ))}
        </div>
      </div>
      {allPairsMatched && (
        <div className="mt-4">
          <Button className="w-full" variant="default">
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default MatchingPairsQuestion;
