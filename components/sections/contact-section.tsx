import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/composites/contact-form";

export function ContactSection() {
  const t = useTranslations("ContactPage");

  return (
    <section id="contact" className="pb-10 mx-auto max-w-6xl w-5/6 ">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {t("contact")}
        </h2>
        <p className="mt-4 text-muted-foreground">{t("contactDescription")}</p>
      </div>
      <ContactForm />
    </section>
  );
}
