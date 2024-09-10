'use client';

import { ReactNode, useState } from 'react';
import { PromptContext } from '../context/prompt-context';
import { PromptType } from '../types/prompt-type';
import { PromptData } from '../data/prompt-data';

export interface PromptProviderProps {
    children: ReactNode;
}

// Provider for managing prompts
export const PromptProvider = ({ children }: PromptProviderProps) => {
    const [prompts, setPrompts] = useState<PromptType[]>(PromptData);

    const addPrompt = (newPrompt: PromptType) => {
        setPrompts((prevPrompts) => [...prevPrompts, newPrompt]);
    };

    return (
        <PromptContext.Provider value={{ prompts, addPrompt }}>
            {children}
        </PromptContext.Provider>
    );
};
