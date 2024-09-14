import { CardType } from '../types/card-type';

export const cardsData: CardType[] = [
  {
    cardId: "card_001",
    title: "The Eiffel Tower",
    content: {
      type: "reading",
      passage: "The Eiffel Tower is a wrought-iron lattice tower in Paris.",
      imageUrl: "/images/eiffel-tower.jpg"
    },
    question: {
      type: "multiple-choice",
      question: "Where is the Eiffel Tower located?",
      options: ["London", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    difficulty: "easy",
    topic: "Geography",
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
      question: "The square root of 64 is?",
      correctAnswer: "8"
    },
    difficulty: "medium",
    topic: "Math",
    createdAt: "2024-01-02"
  },
  {
    cardId: "card_003",
    title: "Match Countries and Capitals",
    content: {
      type: "reading",
      passage: "Match the countries with their respective capitals.",
      imageUrl: "/images/map.jpg"
    },
    question: {
      type: "matching-pairs",
      question: "Match the following countries with their capitals:",
      pairs: [
        { left: "France", right: "Paris" },
        { left: "Italy", right: "Rome" },
        { left: "Germany", right: "Berlin" }
      ]
    },
    difficulty: "medium",
    topic: "Geography",
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
      type: "speaking",
      question: "Listen to the audio and introduce yourself in the same way."
    },
    difficulty: "easy",
    topic: "Language",
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
      question: "Write a paragraph describing the most beautiful place you have ever visited.",
      textInputPlaceholder: "Start typing your description..."
    },
    difficulty: "medium",
    topic: "Creative Writing",
    createdAt: "2024-01-05"
  },
  {
    cardId: "card_006",
    title: "The Solar System",
    content: {
      type: "reading",
      passage: "The Solar System consists of the Sun and the objects that orbit it, including eight planets.",
      imageUrl: "/images/solar-system.jpg"
    },
    question: {
      type: "multiple-choice",
      question: "How many planets are in the Solar System?",
      options: ["7", "8", "9"],
      correctAnswer: "8"
    },
    difficulty: "easy",
    topic: "Astronomy",
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
      question: "The name of the composer of this piece is?",
      correctAnswer: "Mozart"
    },
    difficulty: "medium",
    topic: "Music",
    createdAt: "2024-01-07"
  },
  {
    cardId: "card_008",
    title: "Match Animals to Their Sounds",
    content: {
      type: "reading",
      passage: "Match the animals to the sounds they make.",
      imageUrl: "/images/animals.jpg"
    },
    question: {
      type: "matching-pairs",
      question: "Match the animals to their sounds:",
      pairs: [
        { left: "Dog", right: "Bark" },
        { left: "Cat", right: "Meow" },
        { left: "Cow", right: "Moo" }
      ]
    },
    difficulty: "easy",
    topic: "Biology",
    createdAt: "2024-01-08"
  },
  {
    cardId: "card_009",
    title: "Speaking Exercise: Daily Routine",
    content: {
      type: "reading",
      passage: "Match the animals to the sounds they make.",
      imageUrl: "/images/animals.jpg"
    },
    question: {
      type: "speaking",
      question: "Talk about your daily routine in the same way as the example."
    },
    difficulty: "medium",
    topic: "Language",
    createdAt: "2024-01-09"
  },
  {
    cardId: "card_010",
    title: "Writing Challenge: Future Goals",
    content: {
      type: "reading",
      passage: "Think about where you see yourself in 10 years.",
    },
    question: {
      type: "writing",
      question: "Write about your future goals and aspirations.",
      textInputPlaceholder: "Start writing here..."
    },
    difficulty: "hard",
    topic: "Personal Development",
    createdAt: "2024-01-10"
  }
];
