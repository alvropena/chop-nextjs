import { db } from "../db";
import { generateRandomToken } from "../common";
import type { UserId } from "@/types/auth-type";
import { TOKEN_LENGTH, TOKEN_TTL } from "./magic-links-repository";

export async function createVerifyEmailToken(userId: UserId) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db.verifyEmailToken.upsert({
    where: {
      userId,
    },
    update: {
      token: token,
      tokenExpiresAt: tokenExpiresAt,
    },
    create: {
      userId,
      token: token,
      tokenExpiresAt: tokenExpiresAt,
    },
  });

  return token;
}

export async function getVerifyEmailToken(token: string) {
  const existingToken = await db.verifyEmailToken.findFirst({
    where: { token },
  });

  return existingToken;
}

export async function deleteVerifyEmailToken(token: string) {
  await db.verifyEmailToken.deleteMany({ where: { token } });
}
