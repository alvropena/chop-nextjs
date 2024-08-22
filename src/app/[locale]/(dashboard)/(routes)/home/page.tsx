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
    type: "listening",
    title: "Identify the Sound",
    description: "Listen to the sound and select what you hear.",
    options: ["Cat", "Dog", "Bird"],
    audioUrl: "/audio/sound1.mp3",
  },
  {
    type: "speaking",
    title: "Pronunciation Practice",
    description: "Say the following sentence out loud: 'She sells seashells by the seashore.'",
  },
  {
    type: "fillInTheBlank",
    title: "Complete the Sentence",
    description: "Fill in the blank: 'The quick brown ____ jumps over the lazy dog.'",
    options: ["fox", "dog", "cat"],
  },
  {
    type: "matchingPairs",
    title: "Match the Pairs",
    description: "Match the words with their correct translations.",
    pairs: [
      { left: "cat", right: "gato" },
      { left: "dog", right: "perro" },
      { left: "bird", right: "pájaro" },
    ],
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
    type: "reading",
    title: "Reading Comprehension",
    description: "Read the passage and answer the questions.",
    passage: "The sun rises in the east and sets in the west. This daily cycle is known as a day.",
    questions: [
      { question: "Where does the sun rise?", options: ["East", "West"] },
      { question: "What is this cycle called?", options: ["Day", "Night"] },
    ],
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
    type: "speaking",
    title: "Speech Practice",
    description: "Recite the following phrase: 'The early bird catches the worm.'",
  },
  {
    type: "listening",
    title: "Music Identification",
    description: "Listen to the music clip and identify the genre.",
    options: ["Jazz", "Classical", "Rock"],
    audioUrl: "/audio/music1.mp3",
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
  {
    type: "fillInTheBlank",
    title: "Language Learning",
    description: "Complete the sentence: 'Yo ____ a la escuela todos los días.'",
    options: ["voy", "van", "vas"],
  },
  {
    type: "matchingPairs",
    title: "Match the Capitals",
    description: "Match the countries with their capitals.",
    pairs: [
      { left: "France", right: "Paris" },
      { left: "Germany", right: "Berlin" },
      { left: "Japan", right: "Tokyo" },
    ],
  },
  {
    type: "listening",
    title: "Identify the Instrument",
    description: "Listen to the sound and identify the instrument.",
    options: ["Piano", "Violin", "Guitar"],
    audioUrl: "/audio/instrument1.mp3",
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
    switch (card.type) {
      case "write":
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
            <textarea
              className="mt-4 p-2 w-full h-32 border rounded"
              placeholder="Type your answer here..."
            />
          </>
        );
      case "multipleChoice":
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
            <div className="mt-4">
              {card.options.map((option, index) => (
                <Button key={index} variant="outline" className="w-full mb-2">
                  {option}
                </Button>
              ))}
            </div>
          </>
        );
      case "listening":
        return (
          <>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
            <div className="mt-4">
              <audio controls>
                <source src={card.audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              {card.options.map((option, index) => (
                <Button key={index} variant="outline" className="w-full mb-2">
                  {option}
                </Button>
              ))}
            </div>
          </>
        );
      case "speaking":
        return (
          <>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Press to Record
              </Button>
            </div>
          </>
        );
      case "fillInTheBlank":
        return (
          <>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
            <div className="mt-4">
              {card.options.map((option, index) => (
                <Button key={index} variant="outline" className="w-full mb-2">
                  {option}
                </Button>
              ))}
            </div>
          </>
        );
      case "matchingPairs":
        return (
          <>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {card.pairs.map((pair, index) => (
                <div key={index} className="flex justify-between">
                  <span>{pair.left}</span>
                  <span>{pair.right}</span>
                </div>
              ))}
            </div>
          </>
        );
      case "reading":
        return (
          <>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
            <p className="mt-4">{card.passage}</p>
            <div className="mt-4">
              {card.questions.map((question, index) => (
                <div key={index}>
                  <p>{question.question}</p>
                  {question.options.map((option, i) => (
                    <Button key={i} variant="outline" className="w-full mb-2">
                      {option}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
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
