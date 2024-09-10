import { createContext } from 'react';
import { PromptType } from '../types/prompt-type';

// Creating the Prompt context
export const PromptContext = createContext<{
    prompts: PromptType[];
    addPrompt: (newPrompt: PromptType) => void;
} | undefined>(undefined);
