export interface ProfileActivityProps {
    activities: {
        name: string;
        username: string;
        profile_picture: string;
        verified: boolean;
        action: string;
        timestamp: string;
        likes: number;
    }[];
}