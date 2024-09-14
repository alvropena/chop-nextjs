import React, { useState } from 'react';
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

interface WritingQuestionProps {
  question: string;
  textInputPlaceholder?: string;
}

const WritingQuestion: React.FC<WritingQuestionProps> = ({ question, textInputPlaceholder }) => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmitClick = () => {
    // Submit the written answer
  };

  return (
    <div>
      <p className="font-medium mb-2">{question}</p>
      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder={textInputPlaceholder || "Type your answer here..."}
        className="min-h-[80px]"
      />
      <Button
        variant="default"
        disabled={!text}
        className="w-full mt-4"
        onClick={handleSubmitClick}
      >
        Submit
      </Button>
    </div>
  );
};

export default WritingQuestion;
