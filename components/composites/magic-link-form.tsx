"use client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/composites/loading-button";
import { magicLinkSchema } from "@/zod/validation-schema";
import { useSignInWithMagicLink } from "@/services/mutations/auth-mutations";

type MagicLinkFormValues = z.infer<typeof magicLinkSchema>;

export function MagicLinkForm() {
  const signIn = useSignInWithMagicLink();
  const form = useForm<MagicLinkFormValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: MagicLinkFormValues) {
    signIn.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter your email"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={signIn.isPending}
          className="w-full"
          type="submit"
        >
          Sign in with magic link
        </LoadingButton>
      </form>
    </Form>
  );
}
