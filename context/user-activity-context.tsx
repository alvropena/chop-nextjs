import { createContext, useState, useEffect } from 'react';
import { UserActivityType } from '../types/user/user-activity-type';

export const UserActivityContext = createContext<{
    userActivity: UserActivityType | null;
    setUserActivity: (userActivity: UserActivityType | null) => void;
} | undefined>(undefined);

export const UserActivityProvider = ({ children }: { children: React.ReactNode }) => {
    const [userActivity, setUserActivity] = useState<UserActivityType | null>(null);

    return (
        <UserActivityContext.Provider value={{ userActivity, setUserActivity }}>
            {children}
        </UserActivityContext.Provider>
    );
};
