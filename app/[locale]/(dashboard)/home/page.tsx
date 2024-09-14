"use client";

import React, { useState } from "react";
import { useCard } from "../../../../hooks/use-card";
import BaseCard from "../../../../components/cards/base-card";
import { Button } from "../../../../components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function HomePage() {
  const { cards } = useCard();  // Get cards from context
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">      
      {cards[currentCardIndex] && (
        <BaseCard 
          title={cards[currentCardIndex].title} 
          content={cards[currentCardIndex].content} 
          question={cards[currentCardIndex].question}
        />
      )}

      <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col space-y-2">
        <Button onClick={handlePreviousCard} variant="outline" className="rounded-full w-14 h-14">
          <ChevronUp className="h-6 w-6" />
        </Button>
        <Button onClick={handleNextCard} variant="outline" className="rounded-full w-14 h-14">
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
