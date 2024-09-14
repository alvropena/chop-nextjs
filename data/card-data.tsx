  import { BaseCardType } from "../types/card/base-card-type";

  export const cardsData: BaseCardType[] = [
    {
      cardId: "card_001",
      title: "Basketball Rules",
      content: {
        passage: "What are the rules of basketball? Discuss dribbling, shooting, and defense.",
        imageUrl: "/images/basketball.jpg"
      },
      question: {
        type: "multiple-choice",
        options: ["Soccer", "Basketball", "Tennis"],
        correctAnswer: "Basketball"
      },
      difficulty: "easy",
      topic: ["Basketball", "Sports"],
      createdAt: "2024-01-01"
    },
    {
      cardId: "card_002",
      title: "Tennis Scoring System",
      content: {
        passage: "In tennis, the scoring system is unique. Listen to the following audio to learn more about it.",
        audioUrl: "/audio/tennis-scoring.mp3",
        imageUrl: "/images/tennis-court.jpg"
      },
      question: {
        type: "multiple-choice",  
        options: ["15-30", "15-15", "Love"],
        correctAnswer: "Love"
      },
      difficulty: "medium",
      topic: ["Tennis", "Scoring"],
      createdAt: "2024-01-02"
    },
    {
      cardId: "card_003",
      title: "Italian Wine Regions",
      content: {
        passage: "Match the following Italian wine regions with their famous wines.",
        imageUrl: "/images/wine-regions.jpg"
      },
      question: {
        type: "matching-pairs",
        pairs: [
          { left: "Tuscany", right: "Chianti" },
          { left: "Piedmont", right: "Barolo" },
          { left: "Veneto", right: "Prosecco" }
        ]
      },
      difficulty: "medium",
      topic: ["Wine", "Italian"],
      createdAt: "2024-01-03"
    },
    {
      cardId: "card_004",
      title: "Speak Italian: Basic Phrases",
      content: {
        passage: "Learn the basic Italian phrases used in daily conversations. Listen to the audio below.",
        audioUrl: "/audio/italian-phrases.mp3"
      },
      question: {
        type: "multiple-choice",  
        options: ["Ciao", "Grazie", "Buongiorno"],
        correctAnswer: "Buongiorno"
      },
      difficulty: "easy",
      topic: ["Italian", "Language"],
      createdAt: "2024-01-04"
    },
    {
      cardId: "card_005",
      title: "Economic Systems",
      content: {
        passage: "Describe the differences between capitalism and socialism."
      },
      question: {
        type: "writing",
        textInputPlaceholder: "Start typing your description..."
      },
      difficulty: "medium",
      topic: ["Economics", "Finance"],
      createdAt: "2024-01-05"
    },
    {
      cardId: "card_006",
      title: "Football History",
      content: {
        passage: "Who won the first FIFA World Cup? The first World Cup was held in 1930.",
        imageUrl: "/images/football.jpg"
      },
      question: {
        type: "multiple-choice",
        options: ["Brazil", "Uruguay", "Germany"],
        correctAnswer: "Uruguay"
      },
      difficulty: "easy",
      topic: ["Football", "Sports"],
      createdAt: "2024-01-06"
    },
    {
      cardId: "card_007",
      title: "Formula 1 Champions",
      content: {
        passage: "Listen to the achievements of some of the greatest Formula 1 champions.",
        audioUrl: "/audio/f1-champions.mp3"
      },
      question: {
        type: "multiple-choice",  
        options: ["Lewis Hamilton", "Sebastian Vettel", "Max Verstappen"],
        correctAnswer: "Lewis Hamilton"
      },
      difficulty: "medium",
      topic: ["Formula 1", "Motorsports"],
      createdAt: "2024-01-07"
    },
    {
      cardId: "card_008",
      title: "Poker Hands Ranking",
      content: {
        passage: "Match the poker hands with their ranking: Royal Flush, Straight, Full House.",
        imageUrl: "/images/poker.jpg"
      },
      question: {
        type: "matching-pairs",
        pairs: [
          { left: "Royal Flush", right: "Best Hand" },
          { left: "Straight", right: "Middle Hand" },
          { left: "Full House", right: "Good Hand" }
        ]
      },
      difficulty: "easy",
      topic: ["Poker", "Card Games"],
      createdAt: "2024-01-08"
    },
    {
      cardId: "card_009",
      title: "Classical Art Periods",
      content: {
        passage: "Match the classical art periods with their characteristics.",
        imageUrl: "/images/classical-art.jpg"
      },
      question: {
        type: "matching-pairs",
        pairs: [
          { left: "Renaissance", right: "Humanism" },
          { left: "Baroque", right: "Drama" },
          { left: "Neoclassicism", right: "Simplicity" }
        ]
      },
      difficulty: "medium",
      topic: ["Classical Art", "History"],
      createdAt: "2024-01-09"
    },
    {
      cardId: "card_010",
      title: "History of Finance",
      content: {
        passage: "Describe the evolution of financial systems from barter to modern banking."
      },
      question: {
        type: "writing",
        textInputPlaceholder: "Start writing here..."
      },
      difficulty: "hard",
      topic: ["Finance", "History"],
      createdAt: "2024-01-10"
    }
  ];
