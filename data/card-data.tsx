import { CardType } from '../types/card-type';

export const cardsData: CardType[] = [
  {
    cardId: "card_001",
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome"],
    correctAnswer: "Paris",
    difficulty: "easy",
    topic: "Geography",
    type: "multiple-choice",
    createdAt: "2024-01-01",
  },
  {
    cardId: "card_002",
    question: "What is the square root of 64?",
    options: ["6", "8", "7"],
    correctAnswer: "8",
    difficulty: "medium",
    topic: "Math",
    type: "multiple-choice",
    createdAt: "2024-01-02",
  },
];
