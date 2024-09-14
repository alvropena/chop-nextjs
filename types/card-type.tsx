export interface CardType {
    cardId: string;
    question: string;
    options: string[];
    correctAnswer: string;
    difficulty: 'easy' | 'medium' | 'hard';
    topic: string;
    type: 'multiple-choice' | 'text' | 'image';
    createdAt: string;
}
