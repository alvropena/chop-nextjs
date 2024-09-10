import { db } from "../db";
import { generateRandomToken } from "../common";
import { TOKEN_LENGTH, TOKEN_TTL } from "./magic-links-repository";
import type { UserId } from "@/types/auth-type";

export async function createPasswordResetToken(userId: UserId) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db.resetToken.deleteMany({ where: { userId } });
  await db.resetToken.create({ data: { userId, token, tokenExpiresAt } });

  return token;
}

export async function getPasswordResetToken(token: string) {
  const existingToken = await db.resetToken.findFirst({ where: { token } });
  return existingToken;
}

export async function deletePasswordResetToken(token: string) {
  await db.resetToken.deleteMany({ where: { token } });
}
