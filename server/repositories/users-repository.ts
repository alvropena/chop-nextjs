import { db } from "../db";
import { hashPassword } from "../common";
import { getAccountByUserId } from "./accounts-repository";
import type { AuthUser, UserId } from "@/types/auth-type";

export async function deleteUser(userId: UserId) {
  const deletedUser = await db.user.delete({ where: { id: userId } });
  return deletedUser;
}

export async function getUserById(userId: UserId) {
  const user = await db.user.findUnique({ where: { id: userId } });
  return user;
}

export async function createUser(email: string) {
  const user = await db.user.create({ data: { email } });
  return user;
}

export async function createMagicUser(email: string) {
  const user = await db.user.create({
    data: { email, emailVerified: new Date() },
  });

  await db.account.create({
    data: {
      userId: user.id,
      accountType: "email",
    },
  });

  return user;
}

export async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  const account = await getAccountByUserId(user.id);

  if (!account) {
    return false;
  }

  const salt = account.salt;
  const savedPassword = account.password;

  if (!salt || !savedPassword) {
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  return account.password == hash;
}

export async function getUserByEmail(email: string) {
  const user = await db.user.findFirst({
    where: { email },
  });

  return user;
}

export async function getMagicUserAccountByEmail(email: string) {
  const user = await db.user.findFirst({
    where: { email },
  });

  return user;
}

export async function setEmailVerified(userId: UserId) {
  await db.user.update({
    where: { id: userId },
    data: {
      emailVerified: new Date(),
    },
  });
}

export async function updateUser(
  userId: UserId,
  updatedUser: Partial<AuthUser>
) {
  await db.user.update({ where: { id: userId }, data: updatedUser });
}
