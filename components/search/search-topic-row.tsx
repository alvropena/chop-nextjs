// components/SearchTopicRow.tsx

import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchTopic } from "../../hooks/use-search";
import { SearchTopicButton } from "./search-topic-button";

export default function SearchTopicRow({ title, showChevron = true }) {
  const { topics, selectedTopic, handleTopicClick } = useSearchTopic();
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
            <SearchTopicButton
              key={topic.id}
              onClick={() => handleTopicClick(topic.id)}
              isSelected={topic.id === selectedTopic}
              fullWidth={!showChevron}  // Pass the fullWidth prop based on showChevron
            >
              {topic.emoji} {topic.label} {/* Display emoji and label */}
            </SearchTopicButton>
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
