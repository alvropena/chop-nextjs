"use client";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { registrationSchema } from "@/zod/validation-schema";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import { useState } from "react";

type RegisterFormValues = z.infer<typeof registrationSchema>;

export function RegisterForm() {
  const { toast } = useToast();
  const [isError, setIsError] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    console.log(values);
    setIsError(true);
    toast({
      title: "Success",
      description: "Your registration has been successful, you can login now",
      variant: "default",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
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
                  placeholder="Enter your password"
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
                  placeholder="Confirm your password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* {isError && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Uhoh, we couldn&apos;t log you in</AlertTitle>
            <AlertDescription>{"error.message"}</AlertDescription>
          </Alert>
        )} */}

        <Button className="w-full" type="submit">
          {isError ? (
            <LoaderCircle className="animate-spin text-black size-6" />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
