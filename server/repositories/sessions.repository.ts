import { db } from "../db";
import { UserId } from "@/types/user";

export async function deleteSessionForUser(userId: UserId) {
  await db.session.deleteMany({ where: { userId } });
}
