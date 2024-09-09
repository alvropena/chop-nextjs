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
            <div>
                <h2 className="text-2xl font-semibold text-center sm:text-left">{t("team.title")}</h2>
                <div className="flex flex-col sm:flex-row justify-between gap-4 py-4">
                    {/* Team members grid */}
                    <TeamMember
                        name={t("team.members.alvaro.name")}
                        position={t("team.members.alvaro.position")}
                        imageSrc="https://ca.slack-edge.com/T06BALE8ZA5-U06BLQRGT3J-d6528591df4f-512"
                        profileLink="https://www.linkedin.com/in/alvropena/"
                    />
                    <TeamMember
                        name={t("team.members.alonso.name")}
                        position={t("team.members.alonso.position")}
                        imageSrc="https://ca.slack-edge.com/T06BALE8ZA5-U07BG0ZQK7G-062ced2799b7-512"
                        profileLink="https://www.linkedin.com/in/alonso-rojas-9b011622a/"
                    />
                    <TeamMember
                        name={t("team.members.cesar.name")}
                        position={t("team.members.cesar.position")}
                        imageSrc="https://ca.slack-edge.com/T06BALE8ZA5-U07B8369ADV-8d5f6f326fcb-512"
                        profileLink="https://www.linkedin.com/in/csarchvz/"
                    />
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
