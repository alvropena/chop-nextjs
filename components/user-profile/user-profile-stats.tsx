import React from 'react';
import Link from 'next/link';

export function ProfileStats({ streak, followers, following, getLocalizedPath }) {
    return (
        <div className="mt-4 flex justify-around border-t pt-4">
            <div className="text-center">
                <span className="block text-lg font-bold">{streak}</span>
                <span className="text-sm text-muted-foreground">Streak</span>
            </div>
            <Link href={getLocalizedPath('/profile/followers')} className="flex flex-col items-center justify-center">
                <div className="text-center cursor-pointer">
                    <span className="block text-lg font-bold">{followers}</span>
                    <span className="text-sm text-muted-foreground">Followers</span>
                </div>
            </Link>
            <Link href={getLocalizedPath('/profile/following')} className="flex flex-col items-center justify-center">
                <div className="text-center cursor-pointer">
                    <span className="block text-lg font-bold">{following}</span>
                    <span className="text-sm text-muted-foreground">Following</span>
                </div>
            </Link>
        </div>
    );
}
