export interface UserProfileType {
    id: string;                      // Unique identifier for the user
    name: string;                    // Full name of the user
    username: string;                // Username used for login and display
    bio: string;                     // Short bio/description
    profile_picture: string;         // URL to profile picture
    location: string;                // User's location
    verified: boolean;               // Whether the user is verified
    birthday: string;                // Date of birth
    gender: string;                  // Gender information
    email: string;                   // Contact email
    phone_number: string;            // Contact phone number
    social_media_handles: string[];  // Social media links
    streak: number;                  // Streak count for user activities
    followers: number;               // Number of followers
    following: number;               // Number of users followed
    created_at: string;              // Account creation date
    updated_at: string;              // Last profile update date
    providers: string[];             // Auth providers (Google, GitHub, etc.)
    loggedInUser?: boolean;          // Flag to know if it's the logged-in user's profile
}
