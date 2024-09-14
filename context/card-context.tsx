import { createContext, useState, useEffect } from 'react';
import { BaseCardType } from '../types/card/base-card-type';

export const CardContext = createContext<{
    cards: BaseCardType[];  // Store multiple cards
    fetchCardById: (cardId: string) => BaseCardType | undefined;  // Fetch a single card by its ID
    setCards: (cards: BaseCardType[]) => void;  // To set card data
} | undefined>(undefined);