'use client';

import { ReactNode, useState } from 'react';
import { UserContext } from '../context/user-context';
import { UserProfileType } from '../types/user-profile-type';

export interface UserProviderProps {
  children: ReactNode;
}

// Provide the user profile context with state and logic
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProfileType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
