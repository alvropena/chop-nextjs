export interface AuthUser {
  id: string;
  email: string;
  emailVerified?: Date;
}

export type UserId = AuthUser["id"];

export type UserSession = {
  id: UserId;
};
