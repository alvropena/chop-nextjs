import React, { useState } from 'react';
import { HeartIcon } from "lucide-react";
import { formatActivityTimestamp, formatNumber } from '../../lib/format-utils';
import { UserActivityType } from '../../types/user/user-activity-type';

// No additional interface, just working with UserActivityType directly
export function UserActivityItem({ userId, action, timestamp, likes }: UserActivityType) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    const handleHeartClick = () => {
        setLiked(!liked);
        setLikeCount(likeCount + (liked ? -1 : 1));
    };

    return (
        <div className="flex items-start space-x-4 p-4 bg-background border-b">
            <div className="flex-grow">
                <div className="flex items-center space-x-2">
                    <span className="font-bold">User ID: {userId}</span>
                    <span className="text-muted-foreground">&bull;</span>
                    <span className="text-muted-foreground">{formatActivityTimestamp(timestamp)}</span>
                </div>
                <p>{action}</p>
            </div>

            <div
                className="flex items-center space-x-1 cursor-pointer group"
                onClick={handleHeartClick}
            >
                <HeartIcon className={`transition-colors ${liked ? "text-red-500 fill-current" : "text-muted-foreground group-hover:text-red-500"}`} />
                <span className={`text-sm transition-colors ${liked ? "text-red-500" : "text-muted-foreground group-hover:text-red-500"}`}>
                    {formatNumber(likeCount)}
                </span>
            </div>
        </div>
    );
}
