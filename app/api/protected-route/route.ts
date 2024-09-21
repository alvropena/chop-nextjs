import { NextResponse } from "next/server";
import { HttpStatus } from "@/server/http-status-codes";

export async function GET(): Promise<Response> {
  return NextResponse.json(
    { message: "This is a protected route" },
    { status: HttpStatus.OK }
  );
}
