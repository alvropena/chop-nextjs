import { BaseCardContainer } from "@/components/cards/base-card-container";
import { QuestionNavigationButtons } from "@/components/cards/question-navigation-buttons/question-navigation-buttons";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <BaseCardContainer />
      <QuestionNavigationButtons />
    </div>
  );
}
