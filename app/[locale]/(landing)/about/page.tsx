import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("AboutPage");

    return (
        <main>
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
                <p className="mt-4 text-muted-foreground">{t("description")}</p>
            </div>
            <div className="grid gap-8 text-center sm:text-left md:grid-cols-2">
                <div>
                    <h2 className="text-2xl font-semibold">{t("mission.title")}</h2>
                    <p className="mt-4 text-muted-foreground">{t("mission.description")}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold">{t("vision.title")}</h2>
                    <p className="mt-4 text-muted-foreground">{t("vision.description")}</p>
                </div>
            </div>
        </main>
    );
}

function TeamMember({ name, position, imageSrc, profileLink }) {
    return (
        <div className="flex items-center gap-4">
            <Image
                src={imageSrc}
                width={64}
                height={64}
                alt={name}
                className="rounded-full"
                style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
            <div>
                <p className="font-medium">
                    <a href={profileLink} target="_blank" rel="noopener noreferrer" className="custom-underline hover:underline">
                        {name}
                    </a>
                </p>
                <p className="text-muted-foreground">{position}</p>
            </div>
        </div>
    );
}
