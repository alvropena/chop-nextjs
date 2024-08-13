import React from "react";
import { Button } from "@/components/ui/button";

export default function CategoryButtons({
    selectedCategory,
    handleCategoryClick,
}: {
    selectedCategory: any;
    handleCategoryClick: (category: any) => void;
}) {
    return (
        <div className="flex flex-row gap-4 mb-4">
            <Button
                variant={selectedCategory === "geography" ? "default" : "outline"}
                className="h-6 text-xs"
                onClick={() => handleCategoryClick("geography")}
            >
                🗺️ Geography
            </Button>
            <Button
                variant={selectedCategory === "history" ? "default" : "outline"}
                className="h-6 text-xs"
                onClick={() => handleCategoryClick("history")}
            >
                🏛️ History
            </Button>
            <Button
                variant={selectedCategory === "soccer" ? "default" : "outline"}
                className="h-6 text-xs"
                onClick={() => handleCategoryClick("soccer")}
            >
                ⚽ Soccer
            </Button>
        </div>
    );
}