import React from 'react';
import { UserAchievementType } from '../../types/user/user-achievement-type';

export function UserAchievement({ achievements }: { achievements: UserAchievementType[] }) {
    return (
        <div className="mt-6 p-4 flex-grow border-secondary rounded-lg">
            <div className="mt-4 space-y-2">
                {achievements.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold">Achievements</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {achievements.map((achievement) => (
                                <div key={achievement.id} className="p-2 border rounded-lg">
                                    <p className="font-semibold">{achievement.title}</p>
                                    <p className="text-sm text-muted-foreground">{achievement.timestamp}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
