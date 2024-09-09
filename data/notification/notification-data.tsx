import { NotificationType } from "./notification-type";

export const NotificationData: NotificationType[] = [
    {
        id: 1,
        message: "JohnDoe has started following you!",
        type: "follow",
        userId: 123,
        followed: "your_username",
        timestamp: new Date("2024-08-30T10:15:00Z"),
        read: false
    },
    {
        id: 2,
        message: "You’ve reached a 10-day study streak! Keep it going!",
        type: "achievement",
        userId: null,
        timestamp: new Date("2024-08-30T11:00:00Z"),
        read: false
    },
    {
        id: 4,
        message: "AlexBrown is now following you!",
        type: "follow",
        userId: 456,
        followed: "your_username",
        timestamp: new Date("2024-08-29T11:00:00Z"),
        read: true
    },
    {
        id: 5,
        message: "EmilyWhite has followed you!",
        type: "follow",
        userId: 789,
        followed: "your_username",
        timestamp: new Date("2024-08-25T12:30:00Z"),
        read: false
    },
    {
        id: 6,
        message: "ChrisBlue is following you now!",
        type: "follow",
        userId: 1011,
        followed: "your_username",
        timestamp: new Date("2024-08-15T14:00:00Z"),
        read: true
    },
    {
        id: 7,
        message: "SamanthaGreen has started following you!",
        type: "follow",
        userId: 1213,
        followed: "your_username",
        timestamp: new Date("2024-07-30T15:45:00Z"),
        read: true
    },
    {
        id: 8,
        message: "Don't forget to complete your study session today!",
        type: "reminder",
        reminderType: "study",
        timestamp: new Date("2024-08-30T16:00:00Z"),
        read: false
    },
    {
        id: 9,
        message: "Reminder: Complete your study session to keep your streak alive!",
        type: "reminder",
        reminderType: "study",
        timestamp: new Date("2024-08-29T17:00:00Z"),
        read: true
    },
    {
        id: 10,
        message: "Stay on track! Complete your study session today.",
        type: "reminder",
        reminderType: "study",
        timestamp: new Date("2024-08-23T18:00:00Z"),
        read: false
    },
    {
        id: 11,
        message: "Keep learning! Don't forget your study session.",
        type: "reminder",
        reminderType: "study",
        timestamp: new Date("2024-08-10T19:00:00Z"),
        read: true
    },
    {
        id: 12,
        message: "Friendly reminder: Complete your study session for today.",
        type: "reminder",
        reminderType: "study",
        timestamp: new Date("2024-07-25T20:00:00Z"),
        read: true
    }
];
