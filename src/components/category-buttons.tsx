import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function CategoryButtons({
  selectedCategory,
  handleCategoryClick,
}: {
  selectedCategory: any;
  handleCategoryClick: (category: any) => void;
}) {
  const t = useTranslations("");
  return (
    <div className="flex flex-row gap-4 mb-4">
      <Button
        variant={selectedCategory === "geography" ? "default" : "outline"}
        className="h-6 text-xs"
        onClick={() => handleCategoryClick("geography")}
      >
        {t("Geography_Category")}
      </Button>
      <Button
        variant={selectedCategory === "history" ? "default" : "outline"}
        className="h-6 text-xs"
        onClick={() => handleCategoryClick("history")}
      >
        {t("History_Category")}
      </Button>
      <Button
        variant={selectedCategory === "soccer" ? "default" : "outline"}
        className="h-6 text-xs"
        onClick={() => handleCategoryClick("soccer")}
      >
        {t("Soccer_Category")}
      </Button>
    </div>
  );
}
