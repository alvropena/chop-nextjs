import React from 'react';
import { Dot } from 'lucide-react'; // Import the Dot icon from Lucide

export function ProfileInfo({ location, joinedDate, lastActiveDate, achievements }) {
    return (
        <div className="mt-6 p-4 flex-grow border-secondary rounded-lg">
            <div className="mt-4 space-y-2">
                {achievements.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold">Achievements</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="p-2 border rounded-lg">
                                    {achievement}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
