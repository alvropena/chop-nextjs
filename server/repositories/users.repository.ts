import { db } from "../db";
import type { UserId } from "@/types/user";

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
