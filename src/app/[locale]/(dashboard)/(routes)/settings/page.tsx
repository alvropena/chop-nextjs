"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import LangSwitcher from "@/app/[locale]/(dashboard)/_components/language-dropdown";
import { useSchemaStore } from "@/providers/schema-store-provider";

const FormSchema = z.object({
  prompt_base: z.string().min(2, {
    message: "Prompt Base must be at least 2 characters.",
  }),
});

export default function InputForm() {
  const { user_input_generation, setUserInput } = useSchemaStore(
    (state) => state
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt_base: user_input_generation,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setUserInput(data.prompt_base); // Extracting prompt_base value
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="prompt_base"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt Base</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} disabled />
              </FormControl>
              <FormDescription>
                This is the prompt that is going to be used
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>

      <LangSwitcher />
    </Form>
  );
}
