import { rateLimitByKey, DEFAULT_TIME_WINDOW } from "@/lib/auth/limiter";
import { magicLinkSchema as forgotPasswordSchema } from "@/zod/validation-schema";
import { NextResponse } from "next/server";
import { handleCommonError } from "@/server/error-handler";
import { HttpStatus } from "@/server/http-status-codes";
import { resetPasswordUseCase } from "@/server/use-cases/users-usecase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = forgotPasswordSchema.parse(body);

    await rateLimitByKey({
      key: input.email,
      limit: 1,
      window: DEFAULT_TIME_WINDOW * 3,
    });
    await resetPasswordUseCase(input.email);

    return NextResponse.json({ message: "Success" }, { status: HttpStatus.OK });
  } catch (error) {
    return handleCommonError(error);
  }
}
