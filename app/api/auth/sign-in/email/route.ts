import { NextResponse } from "next/server";
import { handleCommonError } from "@/server/error-handler";
import { rateLimitByKey, DEFAULT_TIME_WINDOW } from "@/lib/auth/limiter";
import { loginSchema } from "@/zod/validation-schema";
import { signInUseCase } from "@/server/use-cases/users-usecase";
import { setSession } from "@/lib/auth/session";
import { HttpStatus } from "@/server/http-status-codes";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = loginSchema.parse(body);

    await rateLimitByKey({
      key: input.email,
      limit: 3,
      window: DEFAULT_TIME_WINDOW,
    });
    const user = await signInUseCase(input.email, input.password);
    await setSession(user.id);
    return NextResponse.json(
      { message: "Login success" },
      { status: HttpStatus.OK }
    );
  } catch (error) {
    return handleCommonError(error);
  }
}
