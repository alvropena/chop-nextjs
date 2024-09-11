export interface AuthUser {
  id: string;
  email: string;
  emailVerified?: Date;
}

export type UserId = AuthUser["id"];

export interface UserSession {
  id: UserId;
}

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
