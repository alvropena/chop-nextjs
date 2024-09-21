import {
  createUser,
  deleteUser,
  getUserByEmail,
  updateUser,
  verifyPassword,
} from "../repositories/users-repository";
import { UserId, UserSession } from "@/types/auth-type";
import {
  createAccount,
  createAccountViaGoogle,
  getAccountByUserId,
  updatePasswordTransaction,
} from "../repositories/accounts-repository";
import type { GoogleUser } from "@/types/auth-type";
import {
  createPasswordResetToken,
  getPasswordResetToken,
} from "../repositories/reset-tokens-respository";
import ResetPasswordEmail from "../email-templates/reset-password";
import {
  createVerifyEmailToken,
  deleteVerifyEmailToken,
  getVerifyEmailToken,
} from "../repositories/verify-emails-repository";
import VerifyEmail from "../email-templates/verify-email";
import { APPLICATION_NAME } from "@/data/app-data";
import { sendEmail } from "../common";
import {
  AuthenticationError,
  EmailInUseError,
  LoginError,
} from "../error-handler";

export async function deleteUserUseCase(
  authenticatedUser: UserSession,
  userToDeleteId: UserId
): Promise<void> {
  if (authenticatedUser.id !== userToDeleteId) {
    throw new AuthenticationError();
  }

  await deleteUser(userToDeleteId);
}

export async function registerUserUseCase(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new EmailInUseError();
  }

  const user = await createUser(email);
  await createAccount(user.id, password);

  const token = await createVerifyEmailToken(user.id);
  await sendEmail(
    email,
    `Verify your email for ${APPLICATION_NAME}`,
    <VerifyEmail token={token} />
  );

  return { id: user.id };
}

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new LoginError();
  }

  const isPasswordCorrect = await verifyPassword(email, password);

  if (!isPasswordCorrect) {
    throw new LoginError();
  }

  return { id: user.id };
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (existingUser) {
    // Check if the account already has a googleId
    const account = await getAccountByUserId(existingUser.id);
    if (account && !account.googleId) {
      // Link the Google account to the existing user account
      await createAccountViaGoogle(existingUser.id, googleUser.sub);
    }
  } else {
    // Create a new user and link the Google account
    existingUser = await createUser(googleUser.email);
    await createAccountViaGoogle(existingUser.id, googleUser.sub);
  }
  return existingUser.id;
}

export async function resetPasswordUseCase(email: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthenticationError();
  }

  const token = await createPasswordResetToken(user.id);

  await sendEmail(
    email,
    `Your password reset link for ${APPLICATION_NAME}`,
    <ResetPasswordEmail token={token} />
  );
}

export async function changePasswordUseCase(token: string, password: string) {
  const tokenEntry = await getPasswordResetToken(token);

  if (!tokenEntry) {
    throw new AuthenticationError();
  }

  const userId = tokenEntry.userId;
  await updatePasswordTransaction(userId, token, password);
}

export async function verifyEmailUseCase(token: string) {
  const tokenEntry = await getVerifyEmailToken(token);

  if (!tokenEntry) {
    throw new AuthenticationError();
  }

  const userId = tokenEntry.userId;

  await updateUser(userId, { emailVerified: new Date() });
  await deleteVerifyEmailToken(token);
  return userId;
}
