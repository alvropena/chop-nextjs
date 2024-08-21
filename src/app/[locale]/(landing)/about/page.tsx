import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("AboutPage");

    return (
        <main className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
                    <p className="mt-4 text-muted-foreground">
                        {t("description")}
                    </p>
                </div>
                <div className="grid gap-8 text-center sm:text-left md:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-semibold">{t("mission.title")}</h2>
                        <p className="mt-4 text-muted-foreground">
                            {t("mission.description")}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{t("vision.title")}</h2>
                        <p className="mt-4 text-muted-foreground">
                            {t("vision.description")}
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-center sm:text-left">{t("team.title")}</h2>
                    <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
                        <div className="flex items-center justify-center gap-4">
                            <Image
                                src="https://ca.slack-edge.com/T06BALE8ZA5-U06BLQRGT3J-d6528591df4f-512"
                                width={64}
                                height={64}
                                alt={t("team.members.alvaro.name")}
                                className="rounded-full"
                                style={{ aspectRatio: "64/64", objectFit: "cover" }}
                            />
                            <div>
                                <p className="font-medium text-center sm:text-left">
                                    <a
                                        href="https://www.linkedin.com/in/alvropena/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="custom-underline hover:underline cursor-pointer"
                                    >
                                        {t("team.members.alvaro.name")}
                                    </a>
                                </p>
                                <p className="text-muted-foreground text-center sm:text-left">{t("team.members.alvaro.position")}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <Image
                                src="https://ca.slack-edge.com/T06BALE8ZA5-U07BG0ZQK7G-062ced2799b7-512"
                                width={64}
                                height={64}
                                alt={t("team.members.alonso.name")}
                                className="rounded-full"
                                style={{ aspectRatio: "64/64", objectFit: "cover" }}
                            />
                            <div>
                                <p className="font-medium text-center sm:text-left">
                                    <a
                                        href="https://www.linkedin.com/in/alonso-rojas-9b011622a/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="custom-underline hover:underline cursor-pointer"
                                    >
                                        {t("team.members.alonso.name")}
                                    </a>
                                </p>
                                <p className="text-muted-foreground text-center sm:text-left">{t("team.members.alonso.position")}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <Image
                                src="https://ca.slack-edge.com/T06BALE8ZA5-U07B8369ADV-8d5f6f326fcb-512"
                                width={64}
                                height={64}
                                alt={t("team.members.cesar.name")}
                                className="rounded-full"
                                style={{ aspectRatio: "64/64", objectFit: "cover" }}
                            />
                            <div>
                                <p className="font-medium text-center sm:text-left">
                                    <a
                                        href="https://www.linkedin.com/in/csarchvz/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="custom-underline hover:underline cursor-pointer"
                                    >
                                        {t("team.members.cesar.name")}
                                    </a>
                                </p>
                                <p className="text-muted-foreground text-center sm:text-left">{t("team.members.cesar.position")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
