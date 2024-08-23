import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function CategoryButtons({
  handleCategoryClick,
}: {
  handleCategoryClick: (category: any) => void;
}) {
  const t = useTranslations("");

  const categories = [
    { id: "geography", label: t("Geography_Category") },
    { id: "history", label: t("History_Category") },
    { id: "soccer", label: t("Soccer_Category") },
    { id: "art-history", label: t("Art_History_Category") },
    { id: "basketball", label: t("Basketball_Category") },
    { id: "formula1", label: t("Formula1_Category") },
    { id: "italy", label: t("Italy_Category") },
    { id: "tennis", label: t("Tennis_Category") },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex < categories.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="overflow-hidden max-w-md w-full">
      <h2 className="text-md font-bold mb-2">Trending 🔥</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          className="text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer rounded-full"
          disabled={startIndex === 0}
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex flex-row gap-4">
          {categories.slice(startIndex, startIndex + 3).map((category) => (
            <CustomButton
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.label}
            </CustomButton>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer rounded-full"
          disabled={startIndex >= categories.length - 3}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function CustomButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="h-6 w-28 text-xs font-medium rounded-md transition-colors bg-background border border-input text-foreground hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
