import React, { useState } from 'react';
import { Textarea } from "../../ui/textarea";
import { WritingQuestionType } from '../../../types/card/question/writing-question-type';

const WritingQuestion: React.FC<WritingQuestionType> = ({ textInputPlaceholder }) => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder={textInputPlaceholder || "Type your answer here..."}
        className="min-h-[80px]"
      />
    </div>
  );
};

export default WritingQuestion;
