export interface UserProfileType {
    id: string;
    name: string;
    username: string;
    bio: string;
    profile_picture: string;
    location: string;
    verified: boolean;
    birthday: string;
    gender: string;
    email: string;
    phone_number: string;
    social_media_handles: string[];
    streak: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    providers: string[];
    loggedInUser?: boolean;
}