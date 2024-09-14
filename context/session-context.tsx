import { createContext, useState, useEffect } from 'react';
import { SessionType } from '../types/session-type';

export const SessionContext = createContext<{
    sessions: SessionType[];
    fetchSessionById: (sessionId: string) => SessionType | undefined;
    setSessions: (sessions: SessionType[]) => void;
} | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [sessions, setSessions] = useState<SessionType[]>([]);

    const fetchSessionById = (sessionId: string) => sessions.find((session) => session.sessionId === sessionId);

    return (
        <SessionContext.Provider value={{ sessions, fetchSessionById, setSessions }}>
            {children}
        </SessionContext.Provider>
    );
};
