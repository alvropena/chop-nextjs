import { useContext } from 'react';
import { UserContext } from '../context/user-context';

// Custom hook to access user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};
