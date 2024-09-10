export interface AuthUser {
  id: string;
  email: string;
}

export type UserId = AuthUser["id"];

export type UserSession = {
  id: UserId;
};
