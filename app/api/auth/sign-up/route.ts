import { NextResponse } from "next/server";
import { handleCommonError } from "@/server/error-handler";
import { rateLimitByIp, DEFAULT_TIME_WINDOW } from "@/lib/auth/limiter";
import { loginSchema as registrationSchema } from "@/zod/validation-schema";
import { registerUserUseCase } from "@/server/use-cases/users-usecase";
import { setSession } from "@/lib/auth/session";
import { HttpStatus } from "@/server/http-status-codes";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = registrationSchema.parse(body);

    await rateLimitByIp({
      key: "register",
      limit: 3,
      window: DEFAULT_TIME_WINDOW * 3, // arbitrary value of 30 secs
    });
    const user = await registerUserUseCase(input.email, input.password);
    await setSession(user.id);

    return NextResponse.json(
      { user: user, message: "User created" },
      { status: HttpStatus.CREATED }
    );
  } catch (error) {
    return handleCommonError(error);
  }
}
