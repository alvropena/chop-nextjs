'use client';

import { ReactNode, useState, useEffect } from 'react';
import { UserActivityContext } from '../context/user-activity-context';
import { UserActivityType } from '../types/user/user-activity-type';
import { fetchUserActivityFromAPI } from '../lib/fetch-user-activity-utils';

export interface UserActivityProviderProps {
    children: ReactNode;
}

export const UserActivityProvider = ({ children }: UserActivityProviderProps) => {
    const [userActivity, setUserActivity] = useState<UserActivityType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const activityFromAPI = await fetchUserActivityFromAPI();
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
