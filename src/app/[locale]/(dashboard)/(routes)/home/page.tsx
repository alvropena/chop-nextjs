"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import CardRenderer from "@/components/study-cards/card-renderer";
import { cardsData } from "@/components/study-cards/card-data";
import ChangeTopicDialog from "@/components/change-topic-dialog";
import { Zap, FlameIcon, HeartIcon } from "lucide-react";

export default function HomePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);

  const handleNextCard = () => {
    if (sessionStarted && !dontAskAgain) {
      setIsAlertOpen(true);
    } else {
      moveToNextCard();
    }
  };

  const moveToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex < cardsData.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleContinue = () => {
    setProgress((prev) => Math.min(prev + 10, 100));
    setSessionStarted(true);
  };

  const confirmCategoryChange = () => {
    setIsAlertOpen(false);
    moveToNextCard();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ChangeTopicDialog
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        confirmCategoryChange={confirmCategoryChange}
      />
      
      <div className="relative w-full h-full max-w-md flex-1 mb-16 justify-center">
    <header className="sticky top-0 z-30 flex h-14 items-center justify-center border-b bg-background px-4 md:static md:h-auto md:border-0 md:bg-transparent md:px-6 gap-4">
      <div className="flex items-center w-32 justify-center p-2 rounded-full gap-1 h-7 font-semibold bg-green-400 text-white">
        <Zap className="h-5 w-5 " />
        100
      </div>
      <div className="flex items-center w-32 justify-center p-2 rounded-full gap-1 h-7 font-semibold bg-red-400 text-white">
        <HeartIcon className="h-4 w-4 " />
        5
      </div>
      <div className="flex items-center w-32 justify-center p-2 rounded-full gap-1 h-7 font-semibold bg-orange-400 text-white">
        <FlameIcon className="h-4 w-4 " />
        1
      </div>
    </header>
        <Card className="w-full h-full">
          <CardHeader className="h-full flex flex-col justify-center">
            <CardRenderer card={cardsData[currentCardIndex]} onNextCard={handleContinue} />
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
