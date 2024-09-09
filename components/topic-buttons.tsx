import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type TopicButtonsProps = {
  selectedTopic: string;
  handleTopicClick: (topic: string) => void;
  topics: { id: string; label: string }[];
  title?: string;
  showChevron?: boolean;
};

export default function TopicButtons({
  selectedTopic,
  handleTopicClick,
  topics,
  title,
  showChevron = true,
}: TopicButtonsProps) {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex < topics.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="overflow-hidden w-full">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      <div className="flex items-center gap-4">
        {showChevron && (
          <button
            onClick={handlePrevious}
            className="text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer rounded-full"
            disabled={startIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeftIcon />
          </button>
        )}

        <div className={`flex flex-row ${showChevron ? "gap-4" : "gap-2 w-full"}`}>
          {topics.slice(startIndex, startIndex + 3).map((topic) => (
            <CustomButton
              key={topic.id}
              onClick={() => handleTopicClick(topic.id)}
              isSelected={topic.id === selectedTopic}
              fullWidth={!showChevron}  // Pass the fullWidth prop based on showChevron
            >
              {topic.label}
            </CustomButton>
          ))}
        </div>

        {showChevron && (
          <button
            onClick={handleNext}
            className="text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer rounded-full"
            disabled={startIndex >= topics.length - 3}
            aria-label="Next"
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>
  );
}

type CustomButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isSelected?: boolean;
  fullWidth?: boolean;  // New prop to control the button width
};

function CustomButton({
  children,
  onClick,
  isSelected = false,
  fullWidth = false,
}: CustomButtonProps) {
  return (
    <button
      className={`h-9 ${fullWidth ? "flex-1" : "w-28"} text-sm font-medium rounded-md transition-colors bg-background border border-input text-foreground ${isSelected
        ? "bg-accent text-accent-foreground"
        : "hover:bg-accent hover:text-accent-foreground"
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
