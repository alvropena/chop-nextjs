import { createContext, useState, useEffect } from 'react';
import { CardType } from '../types/card-type';

export const CardContext = createContext<{
    cards: CardType[];  // Store multiple cards
    fetchCardById: (cardId: string) => CardType | undefined;  // Fetch a single card by its ID
    setCards: (cards: CardType[]) => void;  // To set card data
} | undefined>(undefined);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
    const [cards, setCards] = useState<CardType[]>([]);

    const fetchCardById = (cardId: string) => cards.find((card) => card.cardId === cardId);

    return (
        <CardContext.Provider value={{ cards, fetchCardById, setCards }}>
            {children}
        </CardContext.Provider>
    );
};
