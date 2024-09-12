import { AFTER_LOGIN_URL } from "@/data/app-data";
import { setSession } from "@/lib/auth/session";
import { loginWithMagicLinkUseCase } from "@/server/use-cases/magic-links-usecase";
import { HttpStatus } from "@/server/http-status-codes";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(null, {
        status: HttpStatus.FOUND,
        headers: {
          Location: "/sign-in",
        },
      });
    }

    const user = await loginWithMagicLinkUseCase(token);

    await setSession(user.id);

    return new Response(null, {
      status: HttpStatus.FOUND,
      headers: {
        Location: AFTER_LOGIN_URL,
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: HttpStatus.FOUND,
      headers: {
        Location: "/sign-in/magic/error",
      },
    });
  }
}
