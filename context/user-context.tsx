import { createContext } from 'react';
import { UserProfileType } from '../types/user/user-profile-type';

// Create the context for managing user profiles
export const UserContext = createContext<{
    user: UserProfileType | null;
    setUser: (user: UserProfileType | null) => void;
} | undefined>(undefined);
