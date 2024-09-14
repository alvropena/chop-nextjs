'use client';

import { ReactNode, useState, useEffect } from 'react';
import { UserActivityContext } from '../context/user-activity-context';
import { UserActivityType } from '../types/user/user-activity-type';
import { fetchUserActivityFromAPI } from '../api/user-activity-api';  // Example API call

export interface UserActivityProviderProps {
    children: ReactNode;
}

export const UserActivityProvider = ({ children }: UserActivityProviderProps) => {
    const [userActivity, setUserActivity] = useState<UserActivityType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const activityFromAPI = await fetchUserActivityFromAPI();  // API call to get user activity
            setUserActivity(activityFromAPI);
        };
        fetchData();
    }, []);

    return (
        <UserActivityContext.Provider value={{ userActivity, setUserActivity }}>
            {children}
        </UserActivityContext.Provider>
    );
};
