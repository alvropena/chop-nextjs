"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import CardRenderer from "@/components/study-cards/card-renderer";
import { cardsData } from "@/components/study-cards/card-data";

export default function HomePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex < cardsData.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="relative w-full h-full max-w-md flex-1 mb-16 justify-center">
        <Card className="w-full h-full">
          <CardHeader className="h-full flex flex-col justify-center">
            <CardRenderer card={cardsData[currentCardIndex]} />
          </CardHeader>
        </Card>
        <p className="text-sm text-gray-500 text-center mt-4">Chop can make mistakes. Check important info.</p>
      </div>

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
