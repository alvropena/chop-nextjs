import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { BadgeCheck, HeartIcon } from "lucide-react";
import { formatActivityTimestamp, formatNumber } from '../../lib/format-utils';
import { UserActivityItemType } from './types/user-activity-item-type';

export function UserActivityItem({ activity }: UserActivityItemType) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(activity.likes || 0);

    const handleHeartClick = () => {
        if (!liked) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
        }
        setLiked(!liked);
    };

    return (
        <div className="flex items-start space-x-4 p-4 bg-background border-b">
            <Avatar className='h-12 w-12'>
                <AvatarImage src={activity.profile_picture} alt={`@${activity.username}`} />
                <AvatarFallback>
                    {activity.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
            </Avatar>

            <div className="flex-grow">
                <div className="flex items-center space-x-2">
                    <span className="font-bold">{activity.name}</span>
                    {activity.verified && <BadgeCheck className="text-blue-500" />}
                    <span className="text-muted-foreground">@{activity.username}</span>
                    <span className="text-muted-foreground">&bull;</span>
                    <span className="text-muted-foreground">{formatActivityTimestamp(activity.timestamp)}</span>
                </div>
                <p>{activity.action}</p>
            </div>

            <div
                className="flex items-center space-x-1 cursor-pointer group"
                onClick={handleHeartClick}
            >
                <HeartIcon className={`transition-colors ${liked ? "text-red-500 fill-current" : "text-muted-foreground group-hover:text-red-500"}`} />
                <span className={`text-sm transition-colors ${liked ? "text-red-500" : "text-muted-foreground group-hover:text-red-500"}`}>
                    {formatNumber(likes)}
                </span>
            </div>
        </div>
    );
}
