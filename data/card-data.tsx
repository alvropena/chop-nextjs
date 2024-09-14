import { BaseCardType } from "../types/card/base-card-type";

export const cardsData: BaseCardType[] = [
  {
    cardId: "card_001",
    title: "The Eiffel Tower",
    content: {
      type: "reading",
      passage: "Where is the Eiffel Tower located? The Eiffel Tower is a wrought-iron lattice tower in Paris.",
      imageUrl: "/images/eiffel-tower.jpg"
    },
    question: {
      type: "multiple-choice",
      options: ["London", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    difficulty: "easy",
    topic: ["Geography", "Landmarks"],
    createdAt: "2024-01-01"
  },
  {
    cardId: "card_002",
    title: "Listen to the equation",
    content: {
      type: "listening",
      audioUrl: "/audio/equation.mp3",
      imageUrl: "/images/math-equation.jpg"
    },
    question: {
      type: "fill-in-the-blank",
      correctAnswer: "8"
    },
    difficulty: "medium",
    topic: ["Math", "Equations"],
    createdAt: "2024-01-02"
  },
  {
    cardId: "card_003",
    title: "Match Countries and Capitals",
    content: {
      type: "reading",
      passage: "Match the following countries with their capitals: France, Italy, Germany.",
      imageUrl: "/images/map.jpg"
    },
    question: {
      type: "matching-pairs",
      pairs: [
        { left: "France", right: "Paris" },
        { left: "Italy", right: "Rome" },
        { left: "Germany", right: "Berlin" }
      ]
    },
    difficulty: "medium",
    topic: ["Geography", "Capitals"],
    createdAt: "2024-01-03"
  },
  {
    cardId: "card_004",
    title: "Speaking Practice: Introduce Yourself",
    content: {
      type: "listening",
      audioUrl: "/audio/introduction.mp3"
    },
    question: {
      type: "speaking"
    },
    difficulty: "easy",
    topic: ["Language", "Speaking"],
    createdAt: "2024-01-04"
  },
  {
    cardId: "card_005",
    title: "Describe a Beautiful Place",
    content: {
      type: "reading",
      passage: "Think of a beautiful place you have visited."
    },
    question: {
      type: "writing",
      textInputPlaceholder: "Start typing your description..."
    },
    difficulty: "medium",
    topic: ["Creative Writing", "Travel"],
    createdAt: "2024-01-05"
  },
  {
    cardId: "card_006",
    title: "The Solar System",
    content: {
      type: "reading",
      passage: "How many planets are in the Solar System? The Solar System consists of the Sun and the objects that orbit it, including eight planets.",
      imageUrl: "/images/solar-system.jpg"
    },
    question: {
      type: "multiple-choice",
      options: ["7", "8", "9"],
      correctAnswer: "8"
    },
    difficulty: "easy",
    topic: ["Astronomy", "Space"],
    createdAt: "2024-01-06"
  },
  {
    cardId: "card_007",
    title: "Listening to Classical Music",
    content: {
      type: "listening",
      audioUrl: "/audio/classical-music.mp3"
    },
    question: {
      type: "fill-in-the-blank",
      correctAnswer: "Mozart"
    },
    difficulty: "medium",
    topic: ["Music", "Classical"],
    createdAt: "2024-01-07"
  },
  {
    cardId: "card_008",
    title: "Match Animals to Their Sounds",
    content: {
      type: "reading",
      passage: "Match the following animals to their sounds: Dog, Cat, Cow.",
      imageUrl: "/images/animals.jpg"
    },
    question: {
      type: "matching-pairs",
      pairs: [
        { left: "Dog", right: "Bark" },
        { left: "Cat", right: "Meow" },
        { left: "Cow", right: "Moo" }
      ]
    },
    difficulty: "easy",
    topic: ["Biology", "Animals"],
    createdAt: "2024-01-08"
  },
  {
    cardId: "card_009",
    title: "Speaking Exercise: Daily Routine",
    content: {
      type: "listening",
      audioUrl: "/audio/daily-routine.mp3"
    },
    question: {
      type: "speaking"
    },
    difficulty: "medium",
    topic: ["Language", "Speaking"],
    createdAt: "2024-01-09"
  },
  {
    cardId: "card_010",
    title: "Writing Challenge: Future Goals",
    content: {
      type: "reading",
      passage: "Write about your future goals and aspirations."
    },
    question: {
      type: "writing",
      textInputPlaceholder: "Start writing here..."
    },
    difficulty: "hard",
    topic: ["Personal Development", "Writing"],
    createdAt: "2024-01-10"
  }
];
