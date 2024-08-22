"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from "lucide-react";

const cardsData = [
  { title: "Card 1", description: "This is the first card." },
  { title: "Card 2", description: "This is the second card." },
  { title: "Card 3", description: "This is the third card." },
  { title: "Card 4", description: "This is the fourth card." },
  { title: "Card 5", description: "This is the fifth card." },
  { title: "Card 6", description: "This is the sixth card." },
  { title: "Card 7", description: "This is the seventh card." },
  { title: "Card 8", description: "This is the eighth card." },
  { title: "Card 9", description: "This is the ninth card." },
  { title: "Card 10", description: "This is the tenth card." },
];

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
      <div className="relative w-full h-full max-w-md flex-1 mb-16">
        <Card className="w-full h-full">
          <CardHeader className="h-full flex flex-col justify-center">
            <CardTitle>{cardsData[currentCardIndex].title}</CardTitle>
            <CardDescription>{cardsData[currentCardIndex].description}</CardDescription>
          </CardHeader>
        </Card>      
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
