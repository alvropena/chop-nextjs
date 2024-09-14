'use client';

import { ReactNode, useState, useEffect } from 'react';
import { CardContext } from '../context/card-context';
import { CardType } from '../types/card-type';
import { fetchCardsFromAPI } from '../lib/fetch-cards-utils';

export interface CardProviderProps {
    children: ReactNode;
}

export const CardProvider = ({ children }: CardProviderProps) => {
    const [cards, setCards] = useState<CardType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const cardsFromAPI = await fetchCardsFromAPI();     
            setCards(cardsFromAPI);
        };
        fetchData();
    }, []);

    const fetchCardById = (cardId: string) => cards.find((card) => card.cardId === cardId);

    return (
        <CardContext.Provider value={{ cards, fetchCardById, setCards }}>
            {children}
        </CardContext.Provider>
    );
};
