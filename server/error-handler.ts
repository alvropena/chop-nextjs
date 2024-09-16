import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { HttpStatus } from "./http-status-codes";

export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class RateLimitError extends PublicError {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}

export class AuthenticationError extends PublicError {
  constructor() {
    super("Authentication failed, Invalid user or email");
    this.name = "AuthenticationError";
  }
}

export class EmailInUseError extends PublicError {
  constructor() {
    super("Email is already in use");
    this.name = "EmailInUseError";
  }
}

export class NotFoundError extends PublicError {
  constructor() {
    super("Resource not found");
    this.name = "NotFoundError";
  }
}

export class TokenExpiredError extends PublicError {
  constructor() {
    super("Token has expired");
    this.name = "TokenExpiredError";
  }
}

export class LoginError extends PublicError {
  constructor() {
    super("Invalid email or password");
    this.name = "LoginError";
  }
}

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  switch (error.code) {
    case "P2001":
      return NextResponse.json(
        {
          message: "The requested record does not exist",
          error,
        },
        { status: HttpStatus.NOT_FOUND }
      );
    case "P2002":
      return NextResponse.json(
        {
          message: "This record already exists",
          error,
        },
        { status: HttpStatus.CONFLICT }
      );
    case "P2003":
      return NextResponse.json(
        {
          message:
            "Foreign key constraint failed on the field: " + error.meta?.target,
          error,
        },
        { status: HttpStatus.CONFLICT }
      );
    case "P2004":
      return NextResponse.json(
        {
          message: "A constraint failed in the database",
          error,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    case "P2010":
      return NextResponse.json(
        {
          message: "The raw query failed",
          error,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    case "P2011":
      return NextResponse.json(
        {
          message:
            "Null constraint violation on the constraint: " +
            error.meta?.target,
          error,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    case "P2012":
      return NextResponse.json(
        {
          message: "A required value is missing",
          error,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    case "P2013":
      return NextResponse.json(
        {
          message: "Missing required argument for the field",
          error,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    case "P2014":
      return NextResponse.json(
        {
          message:
            "The change you are trying to make would violate the required relation",
          error,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    case "P2015":
      return NextResponse.json(
        {
          message: "A related record could not be found",
          error,
        },
        { status: HttpStatus.NOT_FOUND }
      );
    case "P2016":
      return NextResponse.json(
        {
          message: "Query interpretation error",
          error,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    case "P2025":
      return NextResponse.json(
        {
          message:
            "An operation failed because it depends on one or more records that were required but not found",
          error,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    default:
      return NextResponse.json(
        {
          message: "Unknown Prisma error",
          error,
        },
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
  }
};

export const handleZodError = (error: ZodError) => {
  const messages = error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");

  return NextResponse.json(
    {
      message: messages,
      error: {
        name: error.name,
        issues: error.issues,
      },
    },
    { status: HttpStatus.BAD_REQUEST }
  );
};

export const handlePublicError = (error: PublicError) => {
  const errorMapping: { [key: string]: number } = {
    AuthenticationError: HttpStatus.UNAUTHORIZED,
    EmailInUseError: HttpStatus.CONFLICT,
    NotFoundError: HttpStatus.NOT_FOUND,
    TokenExpiredError: HttpStatus.UNAUTHORIZED,
    LoginError: HttpStatus.UNAUTHORIZED,
    RateLimitError: HttpStatus.TOO_MANY_REQUESTS,
  };

  const status = errorMapping[error.name] || HttpStatus.BAD_REQUEST;
  return NextResponse.json(
    {
      message: error.message,
      error,
    },
    { status }
  );
};

export const handleCommonError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
    return handlePrismaError(error);
  } else if (error instanceof ZodError) {
    // Handle Zod validation errors
    return handleZodError(error);
  } else if (error instanceof PublicError) {
    // Handle PublicErrors and its subclasses
    return handlePublicError(error);
  } else {
    // Handle other errors
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
};
