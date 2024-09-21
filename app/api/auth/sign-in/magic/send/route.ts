import { rateLimitByKey, DEFAULT_TIME_WINDOW } from "@/lib/auth/limiter";
import { sendMagicLinkUseCase } from "@/server/use-cases/magic-links-usecase";
import { magicLinkSchema } from "@/zod/validation-schema";
import { NextResponse } from "next/server";
import { handleCommonError } from "@/server/error-handler";
import { HttpStatus } from "@/server/http-status-codes";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = magicLinkSchema.parse(body);

    await rateLimitByKey({
      key: input.email,
      limit: 1,
      window: DEFAULT_TIME_WINDOW * 3,
    });
    await sendMagicLinkUseCase(input.email);

    return NextResponse.json(
      { redirectTo: "/sign-in/magic/sent" },
      { status: HttpStatus.OK }
    );
  } catch (error) {
    return handleCommonError(error);
  }
}
