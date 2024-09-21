import type {
  loginSchema,
  magicLinkSchema,
  forgotPasswordSchema,
  changePasswordSchema,
} from "@/zod/validation-schema";
import type { z } from "zod";

export interface AuthUser {
  id: string;
  email: string;
  emailVerified?: Date;
}

export type UserId = AuthUser["id"];

export interface UserSession {
  id: UserId;
}

export type CredentialsDto = z.infer<typeof loginSchema>;

export type MagicLinkDto = z.infer<typeof magicLinkSchema>;

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;

interface RedirectResponse {
  redirectTo: string;
}

interface MessageResponse {
  message: string;
}

export interface SignOutResponseDto extends RedirectResponse {}

export interface SignInWithCredentialsResponseDto extends MessageResponse {}

export interface SignInWithMagicLinkResponseDto extends RedirectResponse {}

export interface SignUpResponseDto extends MessageResponse {
  user: UserSession;
}

export interface PasswordResetResponseDto extends MessageResponse {}

export interface ForgotPasswordResponseDto extends MessageResponse {}

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
