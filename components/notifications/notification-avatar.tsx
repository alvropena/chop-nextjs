import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NotificationAvatarType } from "./types/notification-avatar-type";

export function NotificationAvatar({ userId, imageUrl }: NotificationAvatarType) {
    return (
        <Avatar>
            <AvatarImage src={imageUrl} alt={`User ${userId}`} />
            <AvatarFallback>{userId.toString().slice(0, 2)}</AvatarFallback>
        </Avatar>
    );
}
