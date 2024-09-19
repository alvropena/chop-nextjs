import { useTranslations } from "next-intl";
import { PricingOption } from "@/components/landing/pricing-option";
import { Badge } from "@/components/ui/badge";

export function PricingSection() {
  const t = useTranslations("PricingPage");

  return (
    <section id="pricing" className="space-y-10 pb-10 mx-auto max-w-6xl w-5/6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <Badge variant="default" className="mt-4">
          {t("comingSoon")}
        </Badge>
        <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        <p className="mt-4">{t("chopIsFree")}</p>
      </div>
      <div className="flex gap-8 justify-center flex-wrap">
        <PricingOption
          title={t("individual.title")}
          description={t("individual.description")}
          price={t("individual.price")}
          linkText={t("individual.discount")}
          linkHref="/pricing/students"
        />
        <PricingOption
          title={t("family.title")}
          description={t("family.description")}
          price={t("family.price")}
        />
        <PricingOption
          title={t("enterprise.title")}
          description={t("enterprise.description")}
          price={t("enterprise.price")}
        />
      </div>
    </section>
  );
}
