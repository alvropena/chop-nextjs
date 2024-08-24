"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useTranslations } from "next-intl";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post(`${baseUrl}/api/feedback/send-feedback`, {
        ...data,
        type_message: "feedback",
      });
      toast({
        title: t("messageSent"),
        description: t("messageSuccess"),
      });
      setTimeout(() => reset(), 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t("error"),
        description: t("messageError"),
      });
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-center">
          {t("contact")}
        </h1>
        <Card className="w-full p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t("contactUs")}</CardTitle>
            <CardDescription>{t("contactDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input
                    id="name"
                    placeholder={t("namePlaceholder")}
                    {...register("name")}
                    className="shadow-sm"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    {...register("email")}
                    className="shadow-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t("subject")}</Label>
                  <Input
                    id="subject"
                    placeholder={t("subjectPlaceholder")}
                    {...register("subject")}
                    className="shadow-sm"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("message")}</Label>
                  <Textarea
                    id="message"
                    placeholder={t("messagePlaceholder")}
                    className="min-h-[100px] shadow-sm"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button type="submit">{t("send")}</Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
