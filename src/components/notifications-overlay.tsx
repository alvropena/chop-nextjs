"use client";

import { Button } from "@/components/ui/button";

export default function NotificationsOverlay() {
    const notificationsToday = [
        {
            id: 1,
            avatar: '/path/to/avatar1.jpg',
            text: 'prkeyy, nicolaballesteros and fiorzz__ liked your story.',
            time: '3h',
        },
        {
            id: 2,
            avatar: '/path/to/avatar2.jpg',
            text: 'prkeyy and 1214_kusakabe liked your story.',
            time: '3h',
        },
        {
            id: 3,
            avatar: '/path/to/avatar3.jpg',
            text: 'marianopenasantillan, sebas.quesada23 and 85 others liked your reel.',
            time: '19h',
        },
    ];

    const notificationsThisWeek = [
        {
            id: 4,
            avatar: '/path/to/avatar4.jpg',
            text: 'gerardo.saavedra.d started following you from your reel.',
            time: '2d',
            action: 'Follow',
        },
        {
            id: 5,
            avatar: '/path/to/avatar5.jpg',
            text: 'mattc_aceres commented: NICE 🔥🔥',
            time: '3d',
        },
        {
            id: 6,
            avatar: '/path/to/avatar6.jpg',
            text: 'republic.perez commented: Proud 👏👏',
            time: '3d',
        },
        // Add more notifications
    ];

    return (
        <div className="p-4">
            <div>
                <h3 className="font-semibold mb-2">Today</h3>
                <ul className="mb-4">
                    {notificationsToday.map(notification => (
                        <li key={notification.id} className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <img
                                    src={notification.avatar}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="text-sm">{notification.text}</p>
                                    <p className="text-xs text-gray-500">{notification.time}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="font-semibold mb-2">This week</h3>
                <ul>
                    {notificationsThisWeek.map(notification => (
                        <li key={notification.id} className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <img
                                    src={notification.avatar}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="text-sm">{notification.text}</p>
                                    <p className="text-xs text-gray-500">{notification.time}</p>
                                </div>
                            </div>
                            {notification.action && (
                                <Button size="sm" variant="outline" className="text-blue-500 border-blue-500">
                                    {notification.action}
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
