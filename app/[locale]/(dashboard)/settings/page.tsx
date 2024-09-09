// components/SettingsScreen.tsx
"use client";
import { useSchemaStore } from "../../../../providers/schema-store-provider";
import LanguageCombobox from "../../../../components/language-combobox";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "../../../../components/theme-toggle";
import { useRouter } from "next/navigation";
import SettingSection from "./_components/setting-section";
import SettingItem from "./_components/setting-item";
import SettingSelect from "./_components/setting-select";

export default function SettingsScreen() {
    const { user_input_generation } = useSchemaStore((state) => state);
    const router = useRouter();
    const t = useTranslations("");

    return (
        <div className="flex justify-center h-fit bg-background text-foreground p-8">
            <div className="flex flex-col space-y-6 w-full md:w-full md:max-w-md justify-between">
                <h1 className="text-2xl font-semibold">{t("Settings")}</h1>

                {/* Language Setting */}
                <SettingSection title={t("Language")}>
                    <SettingItem label={t("Language")}>
                        <LanguageCombobox />
                    </SettingItem>
                </SettingSection>

                {/* Dark Mode Setting */}
                <SettingSection title={t("Dark_mode")}>
                    <SettingItem label={t("Dark_mode")}>
                        <ThemeToggle variant="switch" />
                    </SettingItem>
                </SettingSection>

                {/* Log Out Button */}
                <SettingItem
                    label={t("Log_out")}
                    type="label-button"
                    buttonText={t("Log_out")}
                    buttonVariant="destructive"
                    onClick={() => router.push("/api/auth/logout")}
                />
            </div>
        </div>
    );
}