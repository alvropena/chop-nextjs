import { useContext } from 'react';
import { PromptContext } from '../context/prompt-context';

// Custom hook to access prompt store
export const usePrompts = () => {
    const context = useContext(PromptContext);
    if (!context) {
        throw new Error('usePrompts must be used within PromptProvider');
    }
    return context;
};
