import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useThreadStore } from '@/providers/thread-store-provider';

type HomeHeaderProps = {
    setstateThread: React.Dispatch<React.SetStateAction<"CREATE" | "RESPONSE" | "NEW_QUESTION">>;
    setShowNewQuestionButton: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HomeHeader({ setstateThread, setShowNewQuestionButton }: HomeHeaderProps) {
    const resetStore = useThreadStore(state => state.resetStore);

    return (
        <header className="sticky top-0 p-2 flex flex-row justify-end">
            <Button
                onClick={() => {
                    resetStore();
                    setstateThread("CREATE");
                    setShowNewQuestionButton(false);
                }}
            >
                <Plus className="h-4 w-4 mr-2" />
                New Thread
            </Button>
        </header>
    );
}
