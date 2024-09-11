"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { changePasswordAction } from "./actions";
import { Button } from "@/components/ui/button";
import { passwordResetSchema } from "@/zod/validation-schema";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      token: searchParams.token,
      passwordConfirmation: "",
    },
  });

  const { execute, isPending, isSuccess, error } =
    useServerAction(changePasswordAction);

  function onSubmit(values: z.infer<typeof passwordResetSchema>) {
    execute({
      token: values.token,
      password: values.password,
    });
  }

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      {isSuccess && (
        <>
          <h1 className={cn("text-center")}>Password Updated</h1>
          <Alert variant="success">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Password updated</AlertTitle>
            <AlertDescription>
              Your password has been successfully updated.
            </AlertDescription>
          </Alert>

          <Button variant="default" asChild className="w-full">
            <Link href="/sign-in/email">Login with New Password</Link>
          </Button>
        </>
      )}

      {!isSuccess && (
        <>
          <h1 className={cn("text-center")}>Change Password</h1>

          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Uhoh, something went wrong</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
