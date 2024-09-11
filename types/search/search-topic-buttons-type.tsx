import { SearchTopicButtonType } from "./search-topic-button-type";

export interface SearchTopicButtonsType {
    selectedTopic: string;
    handleTopicClick: (topic: string) => void;
    topics: SearchTopicButtonType[];
    title?: string;
    showChevron?: boolean;
}
