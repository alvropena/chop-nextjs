import { useContext } from 'react';
import { UserActivityContext } from '../context/user-activity-context';

export const useUserActivityContext = () => {
    const context = useContext(UserActivityContext);
    if (!context) {
        throw new Error('useUserActivityContext must be used within a UserActivityProvider');
    }
    return context;
};
