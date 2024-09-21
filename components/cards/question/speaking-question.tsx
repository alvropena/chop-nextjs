import React, { useState } from "react";
import { Button } from "../../ui/button";
import { MicIcon, AudioLines } from "lucide-react";
import type { SpeakingQuestionType } from "@/types/card/question/speaking-question-type";

const SpeakingQuestion: React.FC<SpeakingQuestionType> = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
    // Add actual recording functionality here
  };

  const handleSubmitClick = () => {
    // Submit the recorded answer
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button
        variant={isRecording ? "default" : "outline"}
        className="w-24 h-24 rounded-full flex items-center justify-center"
        onClick={handleRecordClick}
      >
        {isRecording ? (
          <AudioLines className="w-5 h-5 animate-pulse" />
        ) : (
          <MicIcon className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default SpeakingQuestion;
