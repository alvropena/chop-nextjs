import Link from "next/link";
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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

function PricingOption({ title, description, price, linkText, linkHref }) {
  return (
    <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-muted-foreground">{description} {linkText && <Link href={linkHref} className="text-primary underline">{linkText}</Link>}</p>
      <div className="mt-8">
        <span className="text-4xl font-bold tracking-tight text-foreground">{price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
    </div>
  );
}
