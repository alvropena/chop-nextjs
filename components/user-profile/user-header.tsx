import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { BadgeCheck, MapPin, CalendarIcon } from "lucide-react";
import { UserProfileType } from '../../types/user/user-profile-type';

export function UserProfileHeader({
    username,
    name,
    bio,
    location,
    created_at: joinedDate,
    profile_picture: profilePicture,
    verified,
    getLocalizedPath
}: UserProfileType & { getLocalizedPath?: (path: string) => string }) {
    return (
        <div className='flex flex-row ml-4 items-center'>
            <div className="">
                <Avatar className='h-20 w-20'>
                    <AvatarImage src={profilePicture} alt={`@${username}`} />
                    <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
            </div>
            <div className="ml-4 w-full grid gap-1">
                <div className='flex flex-row justify-between'>
                    <h2 className="text-2xl font-bold flex items-center">
                        {name}
                        {verified && <BadgeCheck className="ml-2 text-blue-400" />}
                    </h2>
                </div>
                <p className="text-muted-foreground text-md">@{username}</p>
                <p className="text-md">{bio}</p>

                <div className='flex flex-row items-center gap-4 mt-2'>
                    <div className="text-sm flex flex-row items-center">
                        <MapPin className='h-5 w-5 mr-2' />
                        {location}
                    </div>
                    <div className="text-sm flex flex-row items-center">
                        <CalendarIcon className='h-5 w-5 mr-2' />
                        Joined {joinedDate}
                    </div>
                </div>
            </div>
        </div>
    );
}
