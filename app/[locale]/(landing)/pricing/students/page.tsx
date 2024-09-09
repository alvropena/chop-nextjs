import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";

export default function PricingStudentsPage() {
    const t = useTranslations("PricingPage");

    return (
        <main className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <div className="mx-auto max-w-4xl space-y-8">
                <p>Fill the form below to get a special student discount.</p>
            </div>
        </main >
    );
}
