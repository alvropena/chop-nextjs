import React, { useState } from 'react';
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

interface FillInTheBlankQuestionProps {
  question: string;
  correctAnswer: string;
}

const FillInTheBlankQuestion: React.FC<FillInTheBlankQuestionProps> = ({ question }) => {
  const [answer, setAnswer] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <p className="font-medium mb-2">{question}</p>
      <Textarea value={answer} onChange={handleChange} placeholder="Type your answer here..." />
      <Button variant="default" disabled={!answer} className="w-full mt-4">
        Submit
      </Button>
    </div>
  );
};

export default FillInTheBlankQuestion;
