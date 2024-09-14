import { useContext } from 'react';
import { CardContext } from '../context/card-context';

export const useCard = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error('useCardContext must be used within a CardProvider');
    }
    return context;
};
