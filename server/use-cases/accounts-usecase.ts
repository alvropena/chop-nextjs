import { getAccountByGoogleId } from "../repositories/accounts-repository";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId);
}
