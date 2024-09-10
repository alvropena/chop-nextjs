'use client';

import { ReactNode, useEffect, useState } from 'react';
import { UserContext } from '../context/user-context';
import { UserProfileType } from '../types/user/user-profile-type';
import { UserProfileData } from '../data/user-profile-data'; // Import the UserProfileData

export interface UserProviderProps {
  children: ReactNode;
}

// Provide the user profile context with state and logic
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProfileType | null>(null);

  useEffect(() => {
    // Simulate loading the logged-in user (e.g., the first user in UserProfileData)
    const loggedInUser = UserProfileData.find(profile => profile.username === 'alvropena');
    setUser(loggedInUser || null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
