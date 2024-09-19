import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { BlogPostCardList } from "@/components/composites/blog-post-card-list";

export function BlogSection() {
  const t = useTranslations("BlogPage");

  return (
    <section
      id="blog"
      className="flex-1 flex flex-col items-center justify-center gap-4 p-6 pb-14"
    >
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {t("title")}
      </h1>
      <Badge variant="default" className="mt-4">
        {t("comingSoon")}
      </Badge>
      <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      <BlogPostCardList />
    </section>
  );
}
