"use client";
import { useSchemaStore } from "@/providers/schema-store-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LanguageDropdown from "@/components/language-dropdown";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";

export default function InputForm() {
  const { user_input_generation } = useSchemaStore((state) => state);
  const t = useTranslations("");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">{t("Settings")}</h1>
      <Label>Prompt</Label>
      <Input value={user_input_generation} disabled />
      <p className="text-xs">
        {t(
          "Above_is_the_prompt_we_use_to_generate_new_questions_for_you_It_is_not_editable"
        )}
      </p>
      <Label>{t("Language")}</Label>
      <LanguageDropdown />
    </div>
  );
}
