import { db } from "../db";
import { generateRandomToken } from "../common";

export const TOKEN_LENGTH = 32;
// TTL = time to live
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db.magicLink.upsert({
    where: {
      email: email,
    },
    update: {
      token: token,
      tokenExpiresAt: tokenExpiresAt,
    },
    create: {
      email: email,
      token: token,
      tokenExpiresAt: tokenExpiresAt,
    },
  });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await db.magicLink.findFirst({ where: { token } });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await db.magicLink.deleteMany({
    where: {
      token,
    },
  });
}
