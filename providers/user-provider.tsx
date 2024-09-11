'use client';

import { ReactNode, useEffect, useState } from 'react';
import { UserContext } from '../context/user-context';
import { UserProfileType } from '../types/user/user-profile-type';
import { UserProfileData } from '../data/user-profile-data';

export interface UserProviderProps {
  children: ReactNode;
}


export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProfileType | null>(null);

  useEffect(() => {
    const loggedInUser = UserProfileData.find(profile => profile.username === 'alvropena');
    setUser(loggedInUser || null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
