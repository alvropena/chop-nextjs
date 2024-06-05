"use client"

import React from 'react';
import useUserStore from '@/store/useUserStore';

const UserProfile = () => {
    const { user, setUser, clearUser } = useUserStore();

    const handleUpdateUser = () => {
        setUser({ ...user, name: "Jane Doe" });
    };

    const handleClearUser = () => {
        clearUser();
    };

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <button onClick={handleUpdateUser}>Change Name</button>
            <button onClick={handleClearUser}>Clear User</button>
        </div>
    );
};

export default UserProfile;
