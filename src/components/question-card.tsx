import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, LoaderCircle, Info } from "lucide-react";
import { useTranslations } from "next-intl";

export default function QuestionCard({
  question,
  userInput,
  handleInputChange,
  handleKeyDown,
  validateAnswer,
  handleHintClick,
  handleContinue,
  isLoading,
  showContinueButton,
  hintMessage,
  feedbackMessage,
  isHintLoading,
}: {
  question: string;
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  validateAnswer: () => void;
  handleHintClick: () => void;
  handleContinue: () => void;
  isLoading: boolean;
  showContinueButton: boolean;
  hintMessage?: string;
  feedbackMessage?: string;
  isHintLoading: boolean;
}) {
  const t = useTranslations("");

  return (
    <Card className="flex flex-col w-full items-center justify-center h-64">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Label className="text-xl mb-4 text-center">{question}</Label>
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <Input
            type="text"
            placeholder={t("Enter_your_answer")}
            value={userInput}
            className="w-80"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={showContinueButton || isLoading}
          />
          <Button
            variant="default"
            size="icon"
            onClick={validateAnswer}
            disabled={!userInput.trim() || showContinueButton || isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin h-4 w-4" />
            ) : (
              <ArrowRightIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!feedbackMessage && hintMessage && (
          <p className="text-center mt-4 text-sm">{hintMessage}</p>
        )}
        {feedbackMessage && (
          <p className="text-center mt-4 text-sm">{feedbackMessage}</p>
        )}
        {!showContinueButton ? (
          <Button
            variant="secondary"
            className="gap-1 mt-4"
            onClick={handleHintClick}
            disabled={isHintLoading}
          >
            {isHintLoading ? (
              <LoaderCircle className="animate-spin h-4 w-4" />
            ) : (
              <Info className="h-4 w-4" />
            )}{" "}
            {isHintLoading ? t("Loading") : t("Hint")}
          </Button>
        ) : (
          <Button variant="default" className="mt-4" onClick={handleContinue}>
            {t("Continue")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
