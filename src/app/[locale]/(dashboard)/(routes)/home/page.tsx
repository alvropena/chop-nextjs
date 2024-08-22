"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

const cardsData = [
  {
    type: "write",
    title: "Creative Writing",
    description: "Write a short story that begins with: 'The night was cold, and the wind howled through the trees...'",
    imageUrl: "/images/night.jpg",
  },
  {
    type: "multipleChoice",
    title: "Geography Quiz",
    description: "Which of the following is the largest continent by land area?",
    options: ["Africa", "Asia", "North America"],
    imageUrl: "/images/continent.jpg",
  },
  {
    type: "write",
    title: "Philosophical Thought",
    description: "What does 'the meaning of life' mean to you?",
    imageUrl: "/images/philosophy.jpg",
  },
  {
    type: "multipleChoice",
    title: "Science Trivia",
    description: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pt"],
  },
  {
    type: "write",
    title: "Personal Reflection",
    description: "Describe a moment in your life that changed you forever.",
  },
  {
    type: "multipleChoice",
    title: "Historical Knowledge",
    description: "Who was the first president of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln"],
    imageUrl: "/images/president.jpg",
  },
  {
    type: "write",
    title: "Travel Dreams",
    description: "If you could visit any place in the world, where would it be and why?",
    imageUrl: "/images/travel.jpg",
  },
  {
    type: "multipleChoice",
    title: "Literary Analysis",
    description: "Which of these authors wrote '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury"],
  },
  {
    type: "write",
    title: "Future Goals",
    description: "What are your top three goals for the next five years?",
  },
  {
    type: "multipleChoice",
    title: "Music Appreciation",
    description: "Which of the following is a song by The Beatles?",
    options: ["Hey Jude", "Bohemian Rhapsody", "Hotel California"],
    imageUrl: "/images/music.jpg",
  },
];

export default function HomePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex < cardsData.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const renderCardContent = (card) => {
    return (
      <>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
        {card.imageUrl && (
          <div className="mb-4">
            <Image
              src={card.imageUrl}
              alt={card.title}
              width={400}
              height={300}
              className="rounded"
              layout="responsive"
              objectFit="cover"
            />
          </div>
        )}
        {card.type === "write" && (
          <textarea
            className="mt-4 p-2 w-full h-32 border rounded"
            placeholder="Type your answer here..."
          />
        )}
        {card.type === "multipleChoice" && (
          <div className="mt-4">
            {card.options.map((option, index) => (
              <Button key={index} variant="outline" className="w-full mb-2">
                {option}
              </Button>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="relative w-full h-full max-w-md flex-1 mb-16 justify-center">
        <Card className="w-full h-full">
          <CardHeader className="h-full flex flex-col justify-center">
            {renderCardContent(cardsData[currentCardIndex])}
          </CardHeader>
        </Card>
        <p className="text-sm text-gray-500">Chop can make mistakes. Check important info.</p>
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
