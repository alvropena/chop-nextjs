import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import TypingEffect from "@/lib/typing-effect";

export function HeroSection() {
  const t = useTranslations("LandingPage");

  const topics = [
    { word: t("topics.italian"), emoji: "🇮🇹" },
    { word: t("topics.poker"), emoji: "🃏" },
    { word: t("topics.soccer"), emoji: "⚽️" },
    { word: t("topics.formula1"), emoji: "🏎️" },
    { word: t("topics.tennis"), emoji: "🎾" },
    { word: t("topics.singing"), emoji: "🎤" },
    { word: t("topics.cooking"), emoji: "🍳" },
    { word: t("topics.chess"), emoji: "♟️" },
    { word: t("topics.art"), emoji: "🎨" },
  ];

  return (
    <section
      id="hero"
      className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center min-h-[calc(100vh-4rem)]"
    >
      <h1 className="text-5xl font-bold">
        {t("learn")} <TypingEffect texts={topics} className="inline-block" />
      </h1>
      <p className="text-lg sm:text-2xl text-muted-foreground max-w-lg">
        {t("description")}
      </p>
      <Button
        asChild
        variant="default"
        className="md:flex h-9 px-4 text-sm font-medium"
      >
        <Link href="/sign-in">{t("getStarted")}</Link>
      </Button>
    </section>
  );
}
