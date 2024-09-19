import React, { useState } from "react";
import { Textarea } from "../../ui/textarea";
import type { FillInTheBlankQuestionType } from "@/types/card/question/fill-in-the-blank-question-type";

const FillInTheBlankQuestion: React.FC<FillInTheBlankQuestionType> = () => {
  const [answer, setAnswer] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <Textarea
        value={answer}
        onChange={handleChange}
        placeholder="Type your answer here..."
      />
    </div>
  );
};

export default FillInTheBlankQuestion;
