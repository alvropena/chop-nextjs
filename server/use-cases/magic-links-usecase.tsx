import { APPLICATION_NAME } from "@/data/app-data";
import {
  deleteMagicToken,
  getMagicLinkByToken,
  upsertMagicLink,
} from "../repositories/magic-links-repository";
import {
  createMagicUser,
  getUserByEmail,
  setEmailVerified,
} from "../repositories/users-repository";
import MagicLinkEmail from "../email-templates/magic-link";
import { sendEmail } from "../common";
import { NotFoundError, TokenExpiredError } from "../error-handler";

export async function sendMagicLinkUseCase(email: string) {
  const token = await upsertMagicLink(email);

  await sendEmail(
    email,
    `Your magic login link for ${APPLICATION_NAME}`,
    <MagicLinkEmail token={token} />
  );
}

export async function loginWithMagicLinkUseCase(token: string) {
  const magicLinkInfo = await getMagicLinkByToken(token);
  if (!magicLinkInfo) {
    throw new NotFoundError();
  }

  if (magicLinkInfo.tokenExpiresAt! < new Date()) {
    throw new TokenExpiredError();
  }

  const existingUser = await getUserByEmail(magicLinkInfo.email);

  if (existingUser) {
    await setEmailVerified(existingUser.id);
    await deleteMagicToken(token);
    return existingUser;
  } else {
    const newUser = await createMagicUser(magicLinkInfo.email);
    await deleteMagicToken(token);
    return newUser;
  }
}
