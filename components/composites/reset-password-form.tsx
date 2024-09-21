"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordResetSchema } from "@/zod/validation-schema";
import { LoadingButton } from "@/components/composites/loading-button";
import { useChangePassword } from "@/services/mutations/auth-mutations";

type ResetPasswordFormValues = z.infer<typeof passwordResetSchema>;

interface Props {
  token?: string;
}

export function ResetPasswordForm({ token }: Props) {
  const changePassword = useChangePassword();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = ({ password }: ResetPasswordFormValues) => {
    if (token) {
      changePassword.mutate({ password, token });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter your new password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter Confirm your Password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          isLoading={changePassword.isPending}
          className="w-full"
          type="submit"
        >
          Change Password
        </LoadingButton>
      </form>
    </Form>
  );
}
