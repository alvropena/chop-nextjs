"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useCardStore } from "@/stores/use-card-store";
import { useCard } from "@/hooks/use-card";

export const QuestionNavigationButtons = () => {
  const handlePreviousCard = useCardStore((state) => state.handlePreviousCard);
  const handleNextCard = useCardStore((state) => state.handleNextCard);

  const { cards } = useCard(); // Get cards from context

  return (
    <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col space-y-2">
      <Button
        onClick={handlePreviousCard}
        variant="outline"
        className="rounded-full w-14 h-14"
      >
        <ChevronUp className="h-6 w-6" />
      </Button>
      <Button
        onClick={() => handleNextCard(cards.length)}
        variant="outline"
        className="rounded-full w-14 h-14"
      >
        <ChevronDown className="h-6 w-6" />
      </Button>
    </div>
  );
};
