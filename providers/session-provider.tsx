'use client';

import { ReactNode, useState, useEffect } from 'react';
import { SessionContext } from '../context/session-context';
import { SessionType } from '../types/session-type';
import { fetchSessionsFromAPI } from '../api/session-api';  // Example API call

export interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [sessions, setSessions] = useState<SessionType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const sessionsFromAPI = await fetchSessionsFromAPI();  // API call to get sessions
            setSessions(sessionsFromAPI);
        };
        fetchData();
    }, []);

    const fetchSessionById = (sessionId: string) => sessions.find((session) => session.sessionId === sessionId);

    return (
        <SessionContext.Provider value={{ sessions, fetchSessionById, setSessions }}>
            {children}
        </SessionContext.Provider>
    );
};
