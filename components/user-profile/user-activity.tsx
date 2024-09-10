import React from 'react';
import { UserActivityType } from '../../types/user/user-activity-type';
import { UserActivityItem } from './user-activity-item';

// Directly using UserActivityType for props
export function UserActivity({ activities }: { activities: UserActivityType[] }) {
    return (
        <div>
            <h3 className="text-xl font-semibold my-4">Activity</h3>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <UserActivityItem key={activity.id} {...activity} />
                ))}
            </div>
        </div>
    );
}
