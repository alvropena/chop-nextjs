import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { googleAuth } from "@/lib/auth/lucia";
import { createGoogleUserUseCase } from "@/server/use-cases/users-usecase";
import { getAccountByGoogleIdUseCase } from "@/server/use-cases/accounts-usecase";
import { HttpStatus } from "@/server/http-status-codes";
import { AFTER_LOGIN_URL } from "@/data/app-data";
import { setSession } from "@/lib/auth/session";
import type { GoogleUser } from "@/types/auth-type";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: HttpStatus.BAD_REQUEST,
    });
  }

  try {
    const tokens = await googleAuth.validateAuthorizationCode(
      code,
      codeVerifier
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await response.json();

    const existingAccount = await getAccountByGoogleIdUseCase(googleUser.sub);

    if (existingAccount) {
      await setSession(existingAccount.userId);
      return new Response(null, {
        status: HttpStatus.FOUND,
        headers: {
          Location: AFTER_LOGIN_URL,
        },
      });
    }

    const userId = await createGoogleUserUseCase(googleUser);
    await setSession(userId);
    return new Response(null, {
      status: HttpStatus.FOUND,
      headers: {
        Location: AFTER_LOGIN_URL,
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return new Response(null, {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
