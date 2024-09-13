import type {
  CredentialsDto,
  MagicLinkDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  SignOutResponseDto,
  SignUpResponseDto,
  SignInWithCredentialsResponseDto,
  SignInWithMagicLinkResponseDto,
  PasswordResetResponseDto,
  ForgotPasswordResponseDto,
} from "@/types/auth-type";
import { apiClient } from "../client";

export async function signInWithCredentials(credentials: CredentialsDto) {
  return apiClient.post<SignInWithCredentialsResponseDto>(
    "/auth/sign-in/email",
    credentials
  );
}

export async function signInWithMagicLink(userEmail: MagicLinkDto) {
  return apiClient.post<SignInWithMagicLinkResponseDto>(
    "/auth/sign-in/magic/send",
    userEmail
  );
}

export async function forgotPassword(userEmail: ForgotPasswordDto) {
  return apiClient.post<ForgotPasswordResponseDto>(
    "/auth/forgot-password",
    userEmail
  );
}

export async function changePassword(userData: ChangePasswordDto) {
  return apiClient.post<PasswordResetResponseDto>(
    "/auth/reset-password",
    userData
  );
}

export async function signUp(credentials: CredentialsDto) {
  return apiClient.post<SignUpResponseDto>("/auth/sign-up", credentials);
}

export async function signOut() {
  const res = await apiClient.get<SignOutResponseDto>("/auth/sign-out");
  console.log("res.data", res.data);
  return res.data;
}
