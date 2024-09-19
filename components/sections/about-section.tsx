import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("AboutPage");

  return (
    <section id="about" className="container max-w-6xl mb-20">
      <div className="text-center mb-11">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
      </div>
      <div className="flex items-center md:items-start md:justify-center gap-10 text-center flex-col sm:text-left md:flex-row">
        <div className="max-w-[26rem]">
          <h2 className="text-2xl font-semibold">{t("mission.title")}</h2>
          <p className="mt-4 text-muted-foreground">
            {t("mission.description")}
          </p>
        </div>
        <div className="max-w-[26rem]">
          <h2 className="text-2xl font-semibold">{t("vision.title")}</h2>
          <p className="mt-4 text-muted-foreground">
            {t("vision.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
