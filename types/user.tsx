export interface User {
  id: string;
  name: string;
  username: string;
  birthday: Date;
  gender: string;
  bio: string;
  profile_picture: string;
  location: string;
  email: string;
  verified: boolean;
  social_media_handles: string;
  phone_number: string;
  password_hashed: string;
  providers: string;
  created_at: Date;
  updated_at: Date;
}
