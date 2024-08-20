import { Button } from "@/components/ui/button";
import TypingEffect from "@/lib/typing-effect";

export default function LandingPage() {
  const topics = [
    { word: "Italian", emoji: "🇮🇹" },
    { word: "poker", emoji: "🃏" },
    { word: "soccer", emoji: "⚽️" },
    { word: "formula 1", emoji: "🏎️" },
    { word: "tennis", emoji: "🎾" },
    { word: "singing", emoji: "🎤" },
    { word: "cooking", emoji: "🍳" },
    { word: "chess", emoji: "♟️" },
    { word: "art", emoji: "🎨" },
  ];

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">
        Learn <TypingEffect texts={topics} className="inline-block" />
      </h1>
      <p className="text-2xl text-muted-foreground">
        The first social learning platform.
      </p>
      <Button className="" size="lg">
        Get Started
      </Button>
    </main>
  );
}
