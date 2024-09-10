"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "../../../../components/ui/use-toast";
import { contactSchema } from "../../../../lib/contact";
import { ContactFormData } from "../../../../lib/contact";
import { sendFeedback } from "../../../../lib/contact";
import { FormInput } from "../../../../components/form/form-input";
import { FormTextarea } from "../../../../components/form/form-text-area";
import { Button } from "../../../../components/ui/button";

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
      await sendFeedback(data, baseUrl!);
      toast({
        title: t("messageSent"),
        description: t("messageSuccess"),
      });
      setTimeout(() => reset(), 1000);
    } catch (error) {
      toast({
        title: t("error"),
        description: t("messageError"),
      });
    }
  };

  return (
    <main>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("contact")}</h1>
        <p className="mt-4 text-muted-foreground">{t("contactDescription")}</p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            id="name"
            label={t("name")}
            placeholder={t("namePlaceholder")}
            register={register("name")}
            error={errors.name?.message}
          />
          <FormInput
            id="email"
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            type="email"
            register={register("email")}
            error={errors.email?.message}
          />
          <FormInput
            id="subject"
            label={t("subject")}
            placeholder={t("subjectPlaceholder")}
            register={register("subject")}
            error={errors.subject?.message}
          />
          <FormTextarea
            id="message"
            label={t("message")}
            placeholder={t("messagePlaceholder")}
            register={register("message")}
            error={errors.message?.message}
          />
          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              {t("send")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
