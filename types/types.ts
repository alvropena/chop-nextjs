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

export interface Prompt {
  id: string;
  created_at: string;
  text: string;
  user_id: string;
}

export interface Question {
  id: string;
  created_at: Date;
  prompt_id: string;
  user_id: string;
  question_text: string;
}

export interface Option {
  id: string;
  question_id: string;
  option_text: string;
}

export interface UserResponse {
  id: string;
  question_id: string;
  user_id: string;
  selected_option_id: string;
  created_at: Date;
}
