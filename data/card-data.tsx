import { CardType } from '../types/card-type';

export const cardsData: CardType[] = [
  {
    "cardId": "card_001",
    "title": "The Eiffel Tower",
    "content": {
      "type": "reading",
      "passage": "The Eiffel Tower is a wrought-iron lattice tower in Paris.",
      "imageUrl": "/images/eiffel-tower.jpg"
    },
    "question": {
      "type": "multiple-choice",
      "question": "Where is the Eiffel Tower located?",
      "options": ["London", "Paris", "Rome"],
      "correctAnswer": "Paris"
    },
    "difficulty": "easy",
    "topic": "Geography",
    "createdAt": "2024-01-01"
  },
  {
    "cardId": "card_002",
    "title": "Listen to the equation",
    "content": {
      "type": "listening",
      "audioUrl": "/audio/equation.mp3",
      "imageUrl": "/images/math-equation.jpg"
    },
    "question": {
      "type": "fill-in-the-blank",
      "question": "The square root of 64 is?",
      "correctAnswer": "8"
    },
    "difficulty": "medium",
    "topic": "Math",
    "createdAt": "2024-01-02"
  }
]
