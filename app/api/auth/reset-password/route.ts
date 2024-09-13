import { DEFAULT_TIME_WINDOW, rateLimitByIp } from "@/lib/auth/limiter";
import { changePasswordSchema } from "@/zod/validation-schema";
import { NextResponse } from "next/server";
import { handleCommonError } from "@/server/error-handler";
import { HttpStatus } from "@/server/http-status-codes";
import { changePasswordUseCase } from "@/server/use-cases/users-usecase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = changePasswordSchema.parse(body);

    await rateLimitByIp({
      key: "change-password",
      limit: 2,
      window: DEFAULT_TIME_WINDOW * 3,
    });

    await changePasswordUseCase(input.token, input.password);

    return NextResponse.json({ message: "Success" }, { status: HttpStatus.OK });
  } catch (error) {
    return handleCommonError(error);
  }
}
