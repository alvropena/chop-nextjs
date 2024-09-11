import { SearchTopicButtonType } from "../types/search/search-topic-button-type";

export function SearchTopicButton({
    children,
    onClick,
    isSelected = false,
    fullWidth = false,
}: SearchTopicButtonType) {
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
