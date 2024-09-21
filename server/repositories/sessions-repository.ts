import { db } from "../db";
import { UserId } from "@/types/auth-type";

export async function deleteSessionForUser(userId: UserId) {
  await db.session.deleteMany({ where: { userId } });
}
