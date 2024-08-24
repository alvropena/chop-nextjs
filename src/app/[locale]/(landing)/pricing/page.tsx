import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PricingPage() {
    const t = useTranslations("PricingPage");

    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">{t("individual.title")}</h3>
              <p className="mt-4 text-muted-foreground">
                {t("individual.description")}{" "}
                <Link
                  href="/student-discount"
                  className="text-primary underline"
                >
                  {t("individual.discount")}
                </Link>
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {t("individual.price")}
                </span>
                <span className="text-muted-foreground">{t("per_month")}</span>
              </div>
            </div>
            <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">{t("family.title")}</h3>
              <p className="mt-4 text-muted-foreground">
                {t("family.description")}
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {t("family.price")}
                </span>
                <span className="text-muted-foreground">{t("per_month")}</span>
              </div>
            </div>
            <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
              <h3 className="text-2xl font-bold">{t("enterprise.title")}</h3>
              <p className="mt-4 text-muted-foreground">
                {t("enterprise.description")}
              </p>
              <div className="mt-8">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {t("enterprise.price")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}
