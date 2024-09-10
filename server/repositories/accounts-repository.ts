import crypto from "crypto";
import { db } from "../db";
import { hashPassword } from "../common";
import type { UserId } from "@/types/user";

export async function createAccount(userId: UserId, password: string) {
  const salt = crypto.randomBytes(128).toString("base64");
  const hash = await hashPassword(password, salt);
  const account = await db.account.create({
    data: {
      userId,
      accountType: "email",
      password: hash,
      salt,
    },
  });
  return account;
}

export async function createAccountViaGoogle(userId: UserId, googleId: string) {
  await db.account.create({
    data: {
      userId,
      accountType: "google",
      googleId,
    },
  });
}

export async function getAccountByUserId(userId: UserId) {
  const account = await db.account.findFirst({
    where: { userId },
  });

  return account;
}

export async function updatePassword(userId: UserId, password: string) {
  const salt = crypto.randomBytes(128).toString("base64");
  const hash = await hashPassword(password, salt);
  await db.account.update({
    where: { userId, accountType: "email" },
    data: {
      password: hash,
      salt,
    },
  });
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.account.findFirst({
    where: { googleId },
  });
}
