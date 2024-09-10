import React from 'react';
import { ActivityItem } from './ActivityItem';
import UserProfileAc


export function ProfileActivity({ activities }: ProfileActivityProps) {
    return (
        <div>
            <h3 className="text-xl font-semibold my-4">Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                ))}
            </div>
        </div>
    );
}
