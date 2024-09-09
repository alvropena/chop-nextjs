"use client"

import { useState } from "react";
import { Button } from "../../ui/button";
import { NotificationAvatar } from "../notification-avatar";
import { getFormattedDate } from "../../../lib/format-date";
import { NotificationFollowType } from "../types/notification-follow-type";

export function NotificationFollow({ notification, onMarkAsRead, onFollow }: NotificationFollowType) {
    const [isFollowing, setIsFollowing] = useState(false);

    const getUserProfileImageUrl = (userId: number): string => {
        return `https://example.com/profiles/${userId}.jpg`;
    };

    const handleFollowClick = () => {
        if (notification.type === 'follow' && notification.userId) {
            setIsFollowing(!isFollowing);
            if (!isFollowing) {
                onFollow(notification.userId);
            }
        }
    };

    return (
        <div className="relative flex flex-col p-2 border-b" onClick={() => onMarkAsRead(notification.id)}>
            <div className="flex justify-between items-center">
                <small className="text-gray-500">{getFormattedDate(notification.timestamp)}</small>
            </div>
            {notification.type === 'follow' && notification.userId && (
                <div className="flex items-center mt-1 space-x-2">
                    {!notification.read && <span className="text-primary">•</span>}
                    <NotificationAvatar userId={notification.userId} imageUrl={getUserProfileImageUrl(notification.userId)} />
                    <div className="flex-grow">
                        <p>{notification.message}</p>
                    </div>
                    <Button onClick={handleFollowClick}>{isFollowing ? "Following" : "Follow"}</Button>
                </div>
            )}
        </div>
    );
}
