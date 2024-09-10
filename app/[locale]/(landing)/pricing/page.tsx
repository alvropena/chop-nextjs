import { PricingOption } from "../../../../components/landing/pricing-option";
import { useTranslations } from "next-intl";
import { Badge } from "../../../../components/ui/badge";

export default function PricingPage() {
  const t = useTranslations("PricingPage");

  return (
    <main>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
        <Badge variant="default" className="mt-4">{t("comingSoon")}</Badge>
        <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        <p className="mt-4">{t("chopIsFree")}</p>
      </div>
      {/* Added mt-10 to create space between text and pricing options */}
      <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-3">
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
    </main>
  );
}
