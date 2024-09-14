import React, { useState } from 'react';
import { Button } from "../../ui/button";
import { MatchingPairsQuestionType } from '../../../types/card/question/matching-pairs-question-type';

const MatchingPairsQuestion: React.FC<MatchingPairsQuestionType> = ({ pairs }) => {
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
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const allPairsMatched = matchedPairs.length === pairs.length;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="flex flex-col gap-2">
          {pairs.map(pair => (
            <Button
              key={pair.left}
              variant={matchedPairs.some(mp => mp.left === pair.left) ? 'default' : 'outline'}
              disabled={matchedPairs.some(mp => mp.left === pair.left)}
              onClick={() => handleLeftClick(pair.left)}
              className="w-full"
            >
              {pair.left}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {pairs.map(pair => (
            <Button
              key={pair.right}
              variant={matchedPairs.some(mp => mp.right === pair.right) ? 'default' : 'outline'}
              disabled={matchedPairs.some(mp => mp.right === pair.right)}
              onClick={() => handleRightClick(pair.right)}
              className="w-full"
            >
              {pair.right}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingPairsQuestion;
