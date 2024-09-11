import { useContext } from "react";
import { SearchTopicContext } from "../context/search-topic-context";

export function useSearchTopic() {
    const context = useContext(SearchTopicContext);
    if (!context) {
        throw new Error("useSearchTopic must be used within a SearchTopicProvider");
    }
    return context;
}
